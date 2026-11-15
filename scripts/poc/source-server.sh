#!/usr/bin/env bash
# Live proof of concept: a small test server in our own AWS account that stands in for
# the pilot customer's server (no customer data). It serves a web page and appends a UTC timestamp
# to a heartbeat file every minute, so replication lag and data loss after a drill are visible.
# See docs/AWS_LIVE_POC.md.
#
# Usage: scripts/poc/source-server.sh <command>
#   check          free permission checks (dry runs); creates nothing
#   up             create the role, security group and t3.micro instance (~$0.25/day, from credits)
#   verify         show the heartbeat and web page from inside the server (via SSM, no open ports)
#   install-agent  install the AWS DRS replication agent (needs DRS initialized in the Region)
#   status         instance state and DRS source servers
#   down           terminate the instance and delete everything `up` created
#
# Environment: AWS_PROFILE (default aegis), POC_REGION (default us-east-2).
# Everything is tagged Project=aethervault-poc. No SSH key, no inbound ports, IMDSv2 only,
# encrypted disk.
set -euo pipefail

export AWS_PROFILE="${AWS_PROFILE:-aegis}"
REGION="${POC_REGION:-us-east-2}"
NAME=aethervault-poc-source
ROLE=aethervault-poc-source-role
SG_NAME=aethervault-poc-source-sg
TAGS="Key=Project,Value=aethervault-poc"
AMI_PARAM=/aws/service/ami-amazon-linux-latest/al2023-ami-kernel-default-x86_64
POLICIES=(
  arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore
  arn:aws:iam::aws:policy/service-role/AWSElasticDisasterRecoveryEc2InstancePolicy
)

a() { aws --region "$REGION" "$@"; }
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
run_remote() {
  local id cmd_id
  id="$(instance_id)"
  [[ -n $id ]] || { echo "no running $NAME instance; run: $0 up"; exit 1; }
  cmd_id="$(a ssm send-command --instance-ids "$id" --document-name AWS-RunShellScript \
    --parameters "commands=[$(python3 -c 'import json,sys; print(json.dumps(sys.argv[1]))' "$1")]" \
    --timeout-seconds "${2:-600}" --query Command.CommandId --output text)"
  a ssm wait command-executed --command-id "$cmd_id" --instance-id "$id" 2>/dev/null || true
  a ssm get-command-invocation --command-id "$cmd_id" --instance-id "$id" \
    --query '[Status,StandardOutputContent,StandardErrorContent]' --output text
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
}

cmd_check() {
  say "Region $REGION, profile $AWS_PROFILE"
  echo "account: $(aws sts get-caller-identity --query Account --output text)"
  echo "AMI: $(a ssm get-parameter --name $AMI_PARAM --query Parameter.Value --output text)"
  echo "default VPC: $(vpc_id), subnet ${REGION}a: $(subnet_id)"
  for p in "${POLICIES[@]}"; do aws iam get-policy --policy-arn "$p" --query Policy.Arn --output text; done
  say "EC2 launch (dry run, nothing is created)"
  a ec2 run-instances --dry-run --image-id "$(a ssm get-parameter --name $AMI_PARAM --query Parameter.Value --output text)" \
    --instance-type t3.micro --subnet-id "$(subnet_id)" 2>&1 | grep -oE 'DryRunOperation|UnauthorizedOperation.*' | head -1 || true
  say "Elastic Disaster Recovery"
  if out="$(a drs describe-source-servers --query 'length(items)' 2>&1)"; then
    echo "OK: DRS reachable ($out source servers)"
  else
    echo "BLOCKED: $(echo "$out" | grep -oE 'explicit deny in a service control policy.*|UninitializedAccountException.*|AccessDenied.*' | head -1)"
  fi
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

  say "Launching t3.micro"
  local ud ami
  ud="$(mktemp)"
  user_data >"$ud"
  ami="$(a ssm get-parameter --name $AMI_PARAM --query Parameter.Value --output text)"
  local id
  id="$(a ec2 run-instances --image-id "$ami" --instance-type t3.micro --subnet-id "$(subnet_id)" \
    --security-group-ids "$sg" --iam-instance-profile "Name=$ROLE" --user-data "file://$ud" \
    --metadata-options HttpTokens=required,HttpEndpoint=enabled \
    --block-device-mappings 'DeviceName=/dev/xvda,Ebs={VolumeSize=8,VolumeType=gp3,Encrypted=true,DeleteOnTermination=true}' \
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
  run_remote "set -e; cd /tmp
curl -fsSo aws-replication-installer-init https://aws-elastic-disaster-recovery-$REGION.s3.$REGION.amazonaws.com/latest/linux/aws-replication-installer-init
chmod +x aws-replication-installer-init
./aws-replication-installer-init --region $REGION --no-prompt" 1800
}

cmd_status() {
  say "Instance"
  a ec2 describe-instances --filters "Name=tag:Name,Values=$NAME" \
    --query 'Reservations[].Instances[].[InstanceId,State.Name,Placement.AvailabilityZone,LaunchTime]' --output text
  say "DRS source servers"
  a drs describe-source-servers \
    --query 'items[].[sourceServerID,sourceProperties.identificationHints.hostname,dataReplicationInfo.dataReplicationState,dataReplicationInfo.lagDuration]' \
    --output text 2>&1 | grep -oE '^s-.*|explicit deny in a service control policy|UninitializedAccountException' | head -5 || true
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
  up) cmd_up ;;
  verify) cmd_verify ;;
  install-agent) cmd_install_agent ;;
  status) cmd_status ;;
  down) cmd_down ;;
  *) sed -n '2,17p' "$0" | sed 's/^# \{0,1\}//'; exit 1 ;;
esac
