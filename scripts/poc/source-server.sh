#!/usr/bin/env bash
# Live proof of concept: a small test server in our own AWS account that stands in for
# the pilot customer's server (no customer data). It serves a web page and appends a UTC timestamp
# to a heartbeat file every minute, so replication lag and data loss after a drill are visible.
# See docs/AWS_LIVE_POC.md.
#
# Usage: scripts/poc/source-server.sh <command>
#   check          free permission and quota checks (dry runs); creates nothing
#   init-drs       one-time DRS setup in the recovery Region (service init + replication defaults)
#   up             create the role, security group and t3.micro instance (~$0.25/day)
#   verify         show the heartbeat and web page from inside the server (via SSM, no open ports)
#   install-agent  install the DRS replication agent, replicating into the recovery Region
#   verify-drill   on the DRS drill server: wait for SSM, check the web page and last heartbeats
#   status         instance state and DRS source servers
#   drill [snap]   start a DRS drill (newest data); with a snapshot ID, from that point in time
#   last-row       newest database row on the source server (POC_LOAD=postgres)
#   cost           cost so far of what is running, at list prices (estimate; billing lags a day)
#   drs-down       terminate drill servers, disconnect and delete the source server in DRS
#   down           terminate the instance and delete everything `up` created
#
#   verify-drill takes the drill's request time (ISO 8601, as `drill` prints it) to measure data
#   loss from the database: the newest recovered row written before the request.
#
# Environment: AWS_PROFILE (default aegis-dr), POC_SOURCE_REGION (where the test server runs,
# default us-east-1), POC_DRS_REGION (where DRS replicates and recovers, default us-west-2).
# POC_REGION, if set, is the default for both (single-Region test).
# Scale test (docs/SCALE_TEST_PROMPT.md): POC_INSTANCE_TYPE (default t3.micro), POC_DISK_GB
# (default 8), POC_LOAD=postgres (PostgreSQL, one numbered row committed per second, rate-limited
# pgbench), POC_PGBENCH_TPS (default 20; the write rate drives cross-Region transfer cost),
# POC_PGBENCH_SCALE (default 1000, ~15 GB), POC_MAX_HOURS (default 72: the source server powers off
# and terminates itself then, as a cost safety net; DRS and its servers still need `drs-down`).
# Everything is tagged Project=aethervault-poc. No SSH key, no inbound ports, IMDSv2 only,
# encrypted disk.
set -euo pipefail

export AWS_PROFILE="${AWS_PROFILE:-aegis-dr}"
REGION="${POC_SOURCE_REGION:-${POC_REGION:-us-east-1}}"
DRS_REGION="${POC_DRS_REGION:-${POC_REGION:-us-west-2}}"
NAME=aethervault-poc-source
ROLE=aethervault-poc-source-role
SG_NAME=aethervault-poc-source-sg
TAGS="Key=Project,Value=aethervault-poc"
AMI_PARAM=/aws/service/ami-amazon-linux-latest/al2023-ami-kernel-default-x86_64
ITYPE="${POC_INSTANCE_TYPE:-t3.micro}"
DISK_GB="${POC_DISK_GB:-8}"
LOAD="${POC_LOAD:-none}"
TPS="${POC_PGBENCH_TPS:-20}"
PGSCALE="${POC_PGBENCH_SCALE:-1000}"
MAX_HOURS="${POC_MAX_HOURS:-72}"
POLICIES=(
  arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore
  arn:aws:iam::aws:policy/service-role/AWSElasticDisasterRecoveryEc2InstancePolicy
)

a() { aws --region "$REGION" "$@"; }
d() { aws --region "$DRS_REGION" "$@"; }
say() { printf '\n== %s\n' "$*"; }

instance_id() {
  a ec2 describe-instances \
    --filters "Name=tag:Name,Values=$NAME" "Name=instance-state-name,Values=pending,running,stopping,stopped" \
    --query 'Reservations[].Instances[].InstanceId' --output text
}

vpc_id() { a ec2 describe-vpcs --filters Name=is-default,Values=true --query 'Vpcs[0].VpcId' --output text; }
subnet_id() {
  a ec2 describe-subnets --filters Name=default-for-az,Values=true "Name=availability-zone,Values=${REGION}a" \
    --query 'Subnets[0].SubnetId' --output text
}
sg_id() {
  a ec2 describe-security-groups --filters "Name=group-name,Values=$SG_NAME" \
    --query 'SecurityGroups[0].GroupId' --output text 2>/dev/null | grep -v None || true
}

# Run a shell script on the instance through SSM and print its output.
# run_remote <command> [timeout]: runs on the source server, or on REMOTE_ID in REMOTE_REGION.
run_remote() {
  local id cmd_id
  id="${REMOTE_ID:-$(instance_id)}"
  [[ -n $id ]] || { echo "no running $NAME instance; run: $0 up"; exit 1; }
  a() { aws --region "${REMOTE_REGION:-$REGION}" "$@"; }
  cmd_id="$(a ssm send-command --instance-ids "$id" --document-name AWS-RunShellScript \
    --parameters "commands=[$(python3 -c 'import json,sys; print(json.dumps(sys.argv[1]))' "$1")]" \
    --timeout-seconds "${2:-600}" --query Command.CommandId --output text)"
  # Poll instead of `ssm wait`, which gives up after ~100 s (the agent install takes longer).
  local status=Pending
  while [[ $status == Pending || $status == InProgress || $status == Delayed ]]; do
    sleep 10
    status="$(a ssm get-command-invocation --command-id "$cmd_id" --instance-id "$id" \
      --query Status --output text 2>/dev/null || echo Pending)"
  done
  a ssm get-command-invocation --command-id "$cmd_id" --instance-id "$id" \
    --query '[Status,StandardOutputContent,StandardErrorContent]' --output text
  local rc=0
  [[ $status == Success ]] || rc=1
  a() { aws --region "$REGION" "$@"; }
  return $rc
}

# Runs a multi-line script on the target via SSM (base64, so quoting and newlines survive).
run_remote_script() {
  local b64
  b64="$(printf '%s' "$1" | base64 | tr -d '\n')"
  run_remote "echo $b64 | base64 -d | bash" "${2:-600}"
}

# The check run on the drill server. $1 = drill request time (rows written after it don't count).
drill_check_script() {
  local req="${1:-now}"
  cat <<EOF
curl -s -o /dev/null -w 'web page HTTP %{http_code}\n' http://localhost/
echo "heartbeat lines: \$(wc -l < /var/lib/aethervault/heartbeat.log)"; tail -3 /var/lib/aethervault/heartbeat.log
if systemctl list-unit-files postgresql.service >/dev/null 2>&1 && [ -d /var/lib/pgsql/data ]; then
  for i in \$(seq 1 60); do sudo -u postgres psql -qAtc 'SELECT 1' >/dev/null 2>&1 && break; sleep 5; done
  echo "database ready \$(date -u +%FT%T.%3NZ)"
  # When it was really ready, from the drill server's own log (our check above only sees it once
  # Systems Manager connects). Reported alongside; the verified time above stays the official one.
  echo "booted (server clock) \$(uptime -s) UTC"
  journalctl -u postgresql -o short-iso-precise --no-pager -b 2>/dev/null | grep -m1 'Started' | sed 's/^/postgres started (server log): /'
  # Rows written on the drill server after it boots don't count: only rows from before the request.
  sudo -u postgres psql -At -v req="$req" <<'SQL'
SELECT 'newest recovered row ' || max(seq) || ' written ' || max(written_at) AT TIME ZONE 'UTC'
       || ' | data loss ' || round(extract(epoch FROM (:'req'::timestamptz - max(written_at)))::numeric, 1) || ' s'
FROM rows_written WHERE written_at < :'req'::timestamptz;
SQL
fi
EOF
}

cmd_verify_drill() {
  local ec2 ping="" req="${2:-}"
  ec2="$(d drs describe-recovery-instances --query 'items[?isDrill].ec2InstanceID | [0]' --output text)"
  [[ -n $ec2 && $ec2 != None ]] || { echo "no drill recovery instance in $DRS_REGION"; exit 1; }
  say "Drill server $ec2 in $DRS_REGION: waiting for Systems Manager"
  for _ in $(seq 1 60); do
    ping="$(d ssm describe-instance-information --filters "Key=InstanceIds,Values=$ec2" \
      --query 'InstanceInformationList[0].PingStatus' --output text 2>/dev/null || true)"
    [[ $ping == Online ]] && break
    sleep 10
  done
  [[ $ping == Online ]] || { echo "drill server never reached SSM (needs a public IP or VPC endpoints)"; exit 1; }
  echo "SSM online $(date -u +%FT%TZ)"
  REMOTE_ID="$ec2" REMOTE_REGION="$DRS_REGION" run_remote_script "$(drill_check_script "$req")" 600
  echo "checked $(date -u +%FT%TZ)"
}

user_data() {
  cat <<'EOF'
#!/bin/bash
set -e
dnf install -y nginx
cat >/usr/share/nginx/html/index.html <<'HTML'
<h1>AetherVault proof-of-concept source server</h1>
<p>Test server in Aegis Core Labs' own AWS account. Not customer data.</p>
<p><a href="heartbeat.txt">heartbeat.txt</a>: one UTC timestamp per minute.</p>
HTML
mkdir -p /var/lib/aethervault
cat >/etc/systemd/system/aethervault-heartbeat.service <<'UNIT'
[Unit]
Description=AetherVault POC heartbeat (one timestamp per minute)
[Service]
ExecStart=/bin/bash -c 'while true; do date -u +%%Y-%%m-%%dT%%H:%%M:%%SZ >> /var/lib/aethervault/heartbeat.log; cp /var/lib/aethervault/heartbeat.log /usr/share/nginx/html/heartbeat.txt; sync; sleep 60; done'
Restart=always
[Install]
WantedBy=multi-user.target
UNIT
systemctl daemon-reload
systemctl enable --now nginx aethervault-heartbeat
EOF
  # Cost safety net: power off after MAX_HOURS; the instance is launched with shutdown = terminate.
  # (A recovered drill server may run this again on first boot; it then schedules its own power-off.)
  echo "shutdown -P +$((MAX_HOURS * 60)) 'AetherVault POC: ${MAX_HOURS} h limit reached'"
  [[ $LOAD == postgres ]] || return 0
  # Safe to run twice: a recovered drill server can run its user data again on first boot.
  cat <<EOF
dnf install -y postgresql16-server postgresql16-contrib
[ -f /var/lib/pgsql/data/PG_VERSION ] || postgresql-setup --initdb
systemctl enable --now postgresql
sudo -u postgres psql -c "CREATE TABLE IF NOT EXISTS rows_written (seq bigserial PRIMARY KEY, written_at timestamptz NOT NULL DEFAULT clock_timestamp())"
cat >/etc/systemd/system/aethervault-rows.service <<'UNIT'
[Unit]
Description=AetherVault POC: one committed, numbered row per second (measures data loss)
After=postgresql.service
[Service]
User=postgres
ExecStart=/bin/bash -c 'while true; do psql -qAtc "INSERT INTO rows_written DEFAULT VALUES" >/dev/null; sleep 1; done'
Restart=always
[Install]
WantedBy=multi-user.target
UNIT
cat >/etc/systemd/system/aethervault-pgbench.service <<'UNIT'
[Unit]
Description=AetherVault POC: rate-limited pgbench write load (${TPS} transactions/s)
After=postgresql.service
[Service]
User=postgres
TimeoutStartSec=infinity
ExecStartPre=/bin/bash -c 'test -f /var/lib/pgsql/.pgbench-ready || { pgbench -i -q -s ${PGSCALE} && touch /var/lib/pgsql/.pgbench-ready; }'
ExecStart=/bin/bash -c 'exec pgbench -R ${TPS} -T 31536000 -c 2 -j 2 -n'
Restart=always
RestartSec=30
[Install]
WantedBy=multi-user.target
UNIT
systemctl daemon-reload
systemctl enable --now aethervault-rows
systemctl enable --no-block --now aethervault-pgbench
EOF
}

# Running On-Demand Standard (A, C, D, H, I, M, R, T, Z) instances vCPU quota, and Lambda concurrency.
quotas() {
  local r=$1
  echo "$r: EC2 standard vCPUs $(aws --region "$r" service-quotas get-service-quota --service-code ec2 \
    --quota-code L-1216C47A --query Quota.Value --output text 2>&1 | head -1), Lambda concurrency $(aws --region "$r" \
    lambda get-account-settings --query AccountLimit.ConcurrentExecutions --output text 2>&1 | head -1)"
}

cmd_check() {
  say "Source Region $REGION, DRS Region $DRS_REGION, profile $AWS_PROFILE"
  echo "account: $(aws sts get-caller-identity --query Account --output text)"
  echo "AMI: $(a ssm get-parameter --name $AMI_PARAM --query Parameter.Value --output text)"
  echo "default VPC: $(vpc_id), subnet ${REGION}a: $(subnet_id)"
  for p in "${POLICIES[@]}"; do aws iam get-policy --policy-arn "$p" --query Policy.Arn --output text; done
  say "EC2 launch (dry run, nothing is created)"
  a ec2 run-instances --dry-run --image-id "$(a ssm get-parameter --name $AMI_PARAM --query Parameter.Value --output text)" \
    --instance-type "$ITYPE" --subnet-id "$(subnet_id)" 2>&1 | grep -oE 'DryRunOperation|UnauthorizedOperation.*' | head -1 || true
  say "Quotas (new accounts start low; DRS needs ~2 vCPUs per drill or recovery instance)"
  quotas "$REGION"
  [[ $DRS_REGION == "$REGION" ]] || quotas "$DRS_REGION"
  say "Elastic Disaster Recovery in $DRS_REGION"
  if out="$(d drs describe-source-servers --query 'length(items)' 2>&1)"; then
    echo "OK: DRS reachable ($out source servers)"
  elif grep -q UninitializedAccountException <<<"$out"; then
    echo "OK: DRS reachable, not initialized yet. Run: $0 init-drs"
  else
    echo "BLOCKED: $(echo "$out" | grep -oE 'explicit deny in a service control policy.*|AccessDenied.*' | head -1)"
  fi
}

# One-time DRS setup in the recovery Region: creates the DRS service roles and the default
# replication settings (encrypted staging disks, t3.small replication server, 7-day point in time,
# staging area in the default subnet of zone a). Same defaults as docs/AWS_DR_BEST_PRACTICES.md.
# DRS service roles. The console creates these on first use; InitializeService from the CLI
# requires them to exist already. Global (IAM), AWS managed policies only, path /service-role/.
DRS_POLICY=arn:aws:iam::aws:policy/service-role/AWSElasticDisasterRecovery
ensure_ec2_role() {
  local name=$1
  shift
  if ! aws iam get-role --role-name "$name" >/dev/null 2>&1; then
    aws iam create-role --role-name "$name" --path /service-role/ --tags "$TAGS" \
      --assume-role-policy-document '{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Principal":{"Service":"ec2.amazonaws.com"},"Action":"sts:AssumeRole"}]}' >/dev/null
    echo "created $name"
  fi
  for p in "$@"; do aws iam attach-role-policy --role-name "$name" --policy-arn "$p"; done
}
ensure_drs_role() {
  local name=$1 principal=$2 actions=$3
  shift 3
  if ! aws iam get-role --role-name "$name" >/dev/null 2>&1; then
    local account
    account="$(aws sts get-caller-identity --query Account --output text)"
    aws iam create-role --role-name "$name" --path /service-role/ --tags "$TAGS" \
      --assume-role-policy-document "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",
        \"Principal\":{\"Service\":\"$principal\"},\"Action\":$actions,
        \"Condition\":{\"StringEquals\":{\"aws:SourceAccount\":\"$account\"}}}]}" >/dev/null
    echo "created $name"
  fi
  for p in "$@"; do aws iam attach-role-policy --role-name "$name" --policy-arn "$p"; done
}

cmd_init_drs() {
  say "DRS service roles"
  # Replication, conversion and recovery servers are EC2 instances; the agent and failback roles
  # are assumed by DRS itself, limited to this account.
  local drs='["sts:AssumeRole","sts:SetSourceIdentity"]'
  for r in ReplicationServer ConversionServer RecoveryInstance; do
    ensure_ec2_role "AWSElasticDisasterRecovery${r}Role" "${DRS_POLICY}${r}Policy"
  done
  ensure_ec2_role AWSElasticDisasterRecoveryRecoveryInstanceWithLaunchActionsRole \
    "${DRS_POLICY}RecoveryInstancePolicy" arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore
  ensure_drs_role AWSElasticDisasterRecoveryAgentRole drs.amazonaws.com "$drs" "${DRS_POLICY}AgentPolicy"
  ensure_drs_role AWSElasticDisasterRecoveryFailbackRole drs.amazonaws.com "$drs" "${DRS_POLICY}FailbackPolicy"
  echo "waiting 15 s for IAM to propagate"
  sleep 15

  say "Initializing DRS in $DRS_REGION"
  local out
  if ! out="$(d drs initialize-service 2>&1)"; then
    echo "$out"
    exit 1
  fi
  if [[ "$(d drs describe-replication-configuration-templates --query 'length(items)' --output text)" != "0" ]]; then
    echo "replication defaults already exist:"
  else
    local staging
    staging="$(d ec2 describe-subnets --filters Name=default-for-az,Values=true \
      "Name=availability-zone,Values=${DRS_REGION}a" --query 'Subnets[0].SubnetId' --output text)"
    d drs create-replication-configuration-template \
      --staging-area-subnet-id "$staging" \
      --associate-default-security-group \
      --no-use-dedicated-replication-server \
      --replication-server-instance-type t3.small \
      --replication-servers-security-groups-ids '[]' \
      --default-large-staging-disk-type GP3 \
      --ebs-encryption DEFAULT \
      --bandwidth-throttling 0 \
      --data-plane-routing PUBLIC_IP \
      --create-public-ip \
      --staging-area-tags Project=aethervault-poc \
      --pit-policy '[{"interval":10,"retentionDuration":60,"units":"MINUTE","enabled":true,"ruleID":1},
        {"interval":1,"retentionDuration":24,"units":"HOUR","enabled":true,"ruleID":2},
        {"interval":1,"retentionDuration":7,"units":"DAY","enabled":true,"ruleID":3}]' \
      --tags Project=aethervault-poc >/dev/null
    echo "created replication defaults:"
  fi
  d drs describe-replication-configuration-templates \
    --query 'items[0].[stagingAreaSubnetId,replicationServerInstanceType,ebsEncryption,defaultLargeStagingDiskType]' --output text
}

cmd_up() {
  if [[ -n "$(instance_id)" ]]; then echo "already running: $(instance_id)"; return; fi

  say "IAM role $ROLE (SSM access + DRS agent install from the instance role)"
  if ! aws iam get-role --role-name "$ROLE" >/dev/null 2>&1; then
    aws iam create-role --role-name "$ROLE" --tags "$TAGS" \
      --assume-role-policy-document '{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Principal":{"Service":"ec2.amazonaws.com"},"Action":"sts:AssumeRole"}]}' >/dev/null
    for p in "${POLICIES[@]}"; do aws iam attach-role-policy --role-name "$ROLE" --policy-arn "$p"; done
    aws iam create-instance-profile --instance-profile-name "$ROLE" --tags "$TAGS" >/dev/null
    aws iam add-role-to-instance-profile --instance-profile-name "$ROLE" --role-name "$ROLE"
    echo "waiting 15 s for IAM to propagate"
    sleep 15
  fi

  say "Security group $SG_NAME (no inbound rules)"
  local sg
  sg="$(sg_id)"
  if [[ -z $sg ]]; then
    sg="$(a ec2 create-security-group --group-name "$SG_NAME" --vpc-id "$(vpc_id)" \
      --description "AetherVault POC source server: no inbound, all outbound" \
      --tag-specifications "ResourceType=security-group,Tags=[{$TAGS}]" --query GroupId --output text)"
  fi
  echo "$sg"

  say "Launching $ITYPE, ${DISK_GB} GiB gp3, load: $LOAD, terminates itself after ${MAX_HOURS} h"
  local ud ami
  ud="$(mktemp)"
  user_data >"$ud"
  ami="$(a ssm get-parameter --name $AMI_PARAM --query Parameter.Value --output text)"
  local id
  id="$(a ec2 run-instances --image-id "$ami" --instance-type "$ITYPE" --subnet-id "$(subnet_id)" \
    --security-group-ids "$sg" --iam-instance-profile "Name=$ROLE" --user-data "file://$ud" \
    --metadata-options HttpTokens=required,HttpEndpoint=enabled \
    --instance-initiated-shutdown-behavior terminate \
    --block-device-mappings "DeviceName=/dev/xvda,Ebs={VolumeSize=$DISK_GB,VolumeType=gp3,Encrypted=true,DeleteOnTermination=true}" \
    --tag-specifications "ResourceType=instance,Tags=[{Key=Name,Value=$NAME},{$TAGS}]" \
    "ResourceType=volume,Tags=[{Key=Name,Value=$NAME},{$TAGS}]" \
    --query 'Instances[0].InstanceId' --output text)"
  rm -f "$ud"
  echo "$id"
  a ec2 wait instance-running --instance-ids "$id"
  echo "running. Give it ~3 minutes to install, then: $0 verify"
}

cmd_verify() {
  run_remote 'echo "heartbeat lines: $(wc -l < /var/lib/aethervault/heartbeat.log)"; tail -3 /var/lib/aethervault/heartbeat.log; curl -s localhost | head -1' 120
}

cmd_install_agent() {
  # One line joined with && (SSM ran the multi-line form as a single line). /var/tmp and
  # TMPDIR=/var/tmp, not /tmp: Amazon Linux 2023 mounts /tmp as a ~450 MB tmpfs, and the installer
  # downloads ~330 MB there ("No space left on device"). No pipe, so a failed install fails.
  local url="https://aws-elastic-disaster-recovery-$DRS_REGION.s3.$DRS_REGION.amazonaws.com/latest/linux/aws-replication-installer-init"
  # A t3.micro has ~900 MB of RAM and no swap; the installer was killed by the OOM killer while
  # downloading. Add a 1 GB swap file first (kept across reboots).
  run_remote "cd /var/tmp && { swapon --show | grep -q /swapfile || { dd if=/dev/zero of=/swapfile bs=1M count=1024 status=none && chmod 600 /swapfile && mkswap /swapfile >/dev/null && swapon /swapfile && echo '/swapfile none swap defaults 0 0' >> /etc/fstab; }; } && curl -fsSo aws-replication-installer-init $url && chmod +x aws-replication-installer-init && TMPDIR=/var/tmp ./aws-replication-installer-init --region $DRS_REGION --no-prompt" 1800
}

cmd_status() {
  say "Instance"
  a ec2 describe-instances --filters "Name=tag:Name,Values=$NAME" \
    --query 'Reservations[].Instances[].[InstanceId,State.Name,Placement.AvailabilityZone,LaunchTime]' --output text
  say "DRS source servers ($DRS_REGION)"
  d drs describe-source-servers \
    --query 'items[].[sourceServerID,sourceProperties.identificationHints.hostname,dataReplicationInfo.dataReplicationState,dataReplicationInfo.lagDuration]' \
    --output text 2>&1 | grep -oE '^s-.*|explicit deny in a service control policy|UninitializedAccountException' | head -5 || true
}

cmd_last_row() {
  run_remote_script 'sudo -u postgres psql -Atc "SELECT max(seq), max(written_at) FROM rows_written"; date -u +%FT%T.%3NZ' 60
}

# Starts a drill. With a snapshot ID (`aws drs describe-recovery-snapshots`), recovers from that
# point in time instead of taking a new snapshot (scale test step 5).
cmd_drill() {
  local src snap="${2:-}" spec
  src="$(d drs describe-source-servers --query 'items[0].sourceServerID' --output text)"
  [[ -n $src && $src != None ]] || { echo "no DRS source server in $DRS_REGION"; exit 1; }
  spec="sourceServerID=$src"
  [[ -z $snap ]] || spec="$spec,recoverySnapshotID=$snap"
  # macOS date has no %N; python gives milliseconds on both macOS and Linux.
  echo "requested $(python3 -c 'import datetime as d; print(d.datetime.now(d.timezone.utc).isoformat(timespec="milliseconds").replace("+00:00", "Z"))')"
  d drs start-recovery --is-drill --source-servers "$spec" --query 'job.[jobID,creationDateTime]' --output text
}

# Cost so far of running test resources at list prices (verified 2026-11-18, AWS Price List API).
# An estimate: AWS billing lags up to a day.
cmd_cost() {
  python3 - "$REGION" "$DRS_REGION" <<'PY'
import json, subprocess, sys, datetime as dt
src, drs = sys.argv[1], sys.argv[2]
def aws(region, *a):
    return json.loads(subprocess.check_output(["aws", "--region", region, *a, "--output", "json"]))
HOUR = {"t3.micro": 0.0104, "t3.small": 0.0208, "t3.medium": 0.0416, "t3.large": 0.0832}
now = dt.datetime.now(dt.timezone.utc)
total, lines = 0.0, []
def hours(t):
    return (now - dt.datetime.fromisoformat(t.replace("Z", "+00:00"))).total_seconds() / 3600
for region in sorted({src, drs}):
    for r in aws(region, "ec2", "describe-instances", "--filters", "Name=instance-state-name,Values=pending,running,stopping")["Reservations"]:
        for i in r["Instances"]:
            h = hours(i["LaunchTime"]); c = h * HOUR.get(i["InstanceType"], 0.10)
            total += c; lines.append(f"{region}  {i['InstanceType']:<10} {i['InstanceId']}  {h:6.1f} h  ${c:.2f}")
    for v in aws(region, "ec2", "describe-volumes")["Volumes"]:
        h = hours(v["CreateTime"]); c = v["Size"] * 0.08 * h / 730
        total += c; lines.append(f"{region}  volume {v['Size']} GiB  {h:6.1f} h  ${c:.2f}")
    snaps = aws(region, "ec2", "describe-snapshots", "--owner-ids", "self")["Snapshots"]
    if snaps:
        gb = sum(x["VolumeSize"] for x in snaps)
        lines.append(f"{region}  {len(snaps)} snapshots, at most {gb} GB stored: at most ${gb * 0.05 / 30:.2f}/day")
for s in aws(drs, "drs", "describe-source-servers")["items"]:
    info = s.get("dataReplicationInfo", {})
    gb = sum(x.get("replicatedStorageBytes", 0) for x in info.get("replicatedDisks", [])) / 1e9
    added = s.get("lifeCycle", {}).get("addedToServiceDateTime")
    h = hours(added) if added else 0.0
    c = gb * 0.02 + h * 0.028
    total += c
    lines.append(f"DRS {s['sourceServerID']}  {info.get('dataReplicationState')}  lag {info.get('lagDuration')}  "
                 f"{h:.1f} h  replicated {gb:.1f} GB  ${c:.2f} (initial copy + DRS hours; write churn not included)")
print("\n".join(lines) or "nothing running")
print(f"Estimated so far: ${total:.2f}. Stop and ask the founder at $15; never exceed $25 without their OK.")
PY
}

cmd_drs_down() {
  local ids src
  ids="$(d drs describe-recovery-instances --query 'items[].recoveryInstanceID' --output text)"
  if [[ -n $ids && $ids != None ]]; then
    say "Terminating recovery (drill) instances: $ids"
    d drs terminate-recovery-instances --recovery-instance-ids $ids --query 'job.jobID' --output text
  fi
  for src in $(d drs describe-source-servers --query 'items[].sourceServerID' --output text); do
    say "Disconnecting and deleting DRS source server $src"
    d drs disconnect-source-server --source-server-id "$src" >/dev/null
    d drs delete-source-server --source-server-id "$src"
  done
  echo "DRS removes its replication servers and staging disks in a few minutes; check with \`cost\`."
}

cmd_down() {
  local id sg
  id="$(instance_id)"
  if [[ -n $id ]]; then
    say "Terminating $id"
    a ec2 terminate-instances --instance-ids $id >/dev/null
    a ec2 wait instance-terminated --instance-ids $id
  fi
  sg="$(sg_id)"
  if [[ -n $sg ]]; then say "Deleting security group $sg"; a ec2 delete-security-group --group-id "$sg"; fi
  if aws iam get-role --role-name "$ROLE" >/dev/null 2>&1; then
    say "Deleting role $ROLE"
    aws iam remove-role-from-instance-profile --instance-profile-name "$ROLE" --role-name "$ROLE" 2>/dev/null || true
    aws iam delete-instance-profile --instance-profile-name "$ROLE" 2>/dev/null || true
    for p in "${POLICIES[@]}"; do aws iam detach-role-policy --role-name "$ROLE" --policy-arn "$p" 2>/dev/null || true; done
    aws iam delete-role --role-name "$ROLE"
  fi
  echo "Done. If DRS was used, also disconnect/delete the source server in DRS and check for leftover"
  echo "replication servers, volumes and snapshots tagged by DRS (docs/AWS_LIVE_POC.md, teardown)."
}

case "${1:-}" in
  check) cmd_check ;;
  init-drs) cmd_init_drs ;;
  up) cmd_up ;;
  verify) cmd_verify ;;
  verify-drill) cmd_verify_drill "$@" ;;
  install-agent) cmd_install_agent ;;
  status) cmd_status ;;
  drill) cmd_drill "$@" ;;
  last-row) cmd_last_row ;;
  cost) cmd_cost ;;
  drs-down) cmd_drs_down ;;
  down) cmd_down ;;
  *) sed -n '2,37p' "$0" | sed 's/^# \{0,1\}//'; exit 1 ;;
esac
