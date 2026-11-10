import { Check, ChevronDown, ChevronUp, Copy } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import type { IngestTokenStatus, ReplicationCapability, ReplicationStatus } from '../../domain/dr';
import { DRS_REGIONS, agentCommands, tfvars } from './setup';

const errText = (e: unknown) => (e instanceof Error ? e.message : String(e));

type ManualStep = 'region' | 'network' | 'agent' | 'deploy';

// Per-browser progress (a convenience; the steps that matter are checked against the server).
const storeKey = (orgId: string) => `aethervault:aws-setup:${orgId}`;
interface Saved {
  region: string;
  done: Partial<Record<ManualStep, boolean>>;
}
function load(orgId: string): Saved {
  try {
    const raw = window.localStorage.getItem(storeKey(orgId));
    if (raw) {
      const v = JSON.parse(raw) as Partial<Saved>;
      return { region: v.region ?? 'us-west-2', done: v.done ?? {} };
    }
  } catch {
    // Storage blocked or corrupt: start fresh.
  }
  return { region: 'us-west-2', done: {} };
}
function save(orgId: string, v: Saved) {
  try {
    window.localStorage.setItem(storeKey(orgId), JSON.stringify(v));
  } catch {
    // Storage blocked (private mode): progress just isn't remembered.
  }
}

function CodeBlock({ label, text }: { label: string; text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="rounded-lg border border-white/10 bg-black/40">
      <div className="flex items-center justify-between gap-2 px-2.5 py-1 border-b border-white/5">
        <span className="min-w-0 truncate text-[10px] uppercase tracking-widest text-zinc-500 [overflow-wrap:normal]">
          {label}
        </span>
        <button
          type="button"
          onClick={() => {
            void navigator.clipboard
              ?.writeText(text)
              .then(() => setCopied(true))
              .catch(() => setCopied(false));
          }}
          aria-label={`Copy ${label}`}
          className="shrink-0 whitespace-nowrap inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] text-zinc-300 hover:bg-white/[0.08]"
        >
          <Copy className="w-3 h-3" aria-hidden="true" />
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="overflow-x-auto p-2.5 text-[11px] leading-relaxed text-zinc-200 whitespace-pre">
        {text}
      </pre>
    </div>
  );
}

function Step({
  n,
  title,
  done,
  children,
}: {
  n: number;
  title: string;
  done: boolean;
  children: ReactNode;
}) {
  return (
    <li
      data-testid={`setup-step-${n}`}
      data-done={done}
      className="flex gap-3 py-3 border-t border-white/5 first:border-t-0"
    >
      <span
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] ${
          done
            ? 'border-aether-green/60 bg-aether-green/15 text-aether-green'
            : 'border-white/20 text-zinc-400'
        }`}
        aria-hidden="true"
      >
        {done ? <Check className="w-3 h-3" /> : n}
      </span>
      <div className="min-w-0 flex-1 flex flex-col gap-2 text-[11px] font-mono text-zinc-400 [overflow-wrap:anywhere]">
        <p className={done ? 'text-zinc-300' : 'text-zinc-100'}>
          {title}
          <span className="sr-only">{done ? ' (done)' : ' (to do)'}</span>
        </p>
        {children}
      </div>
    </li>
  );
}

/**
 * Guided setup for a customer's AWS account: Elastic Disaster Recovery, replication agent,
 * collector token, collector deployment, first live report. Steps the console can verify
 * (token, live data) are checked against the server; the rest are ticked by the admin.
 */
export default function ConnectAwsWizard({
  orgId,
  replication,
  isAdmin,
  token,
  status,
  live,
  endpoint,
  onChanged,
}: {
  orgId: string;
  replication: ReplicationCapability;
  isAdmin: boolean;
  token: IngestTokenStatus | null;
  status: ReplicationStatus | null | undefined;
  /** A fresh report from a real AWS account (not sample data) has arrived. */
  live: boolean;
  endpoint: { url: string; anonKey: string; isLocal: boolean };
  onChanged: () => void;
}) {
  const [saved, setSaved] = useState<Saved>(() => load(orgId));
  const [open, setOpen] = useState(!live);
  const [fresh, setFresh] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = (next: Saved) => {
    setSaved(next);
    save(orgId, next);
  };
  const mark = (step: ManualStep, value: boolean) =>
    update({ ...saved, done: { ...saved.done, [step]: value } });

  const realData = status?.source === 'aws-drs';
  const done = {
    region: !!saved.done.region || realData,
    network: !!saved.done.network || realData,
    agent: !!saved.done.agent || (realData && (status?.serverCount ?? 0) > 0),
    token: !!token,
    deploy: !!saved.done.deploy || realData,
    live,
  };
  const count = Object.values(done).filter(Boolean).length;
  const cmds = agentCommands(saved.region);

  const createToken = async () => {
    if (
      token &&
      !window.confirm(
        'Replace the current token? The running collector stops until it gets the new one.',
      )
    )
      return;
    setBusy(true);
    setError(null);
    try {
      setFresh(await replication.createToken());
      onChanged();
    } catch (e) {
      setError(errText(e));
    } finally {
      setBusy(false);
    }
  };

  const tick = (step: ManualStep) =>
    isAdmin ? (
      <label className="inline-flex items-center gap-2 text-zinc-300 cursor-pointer w-fit">
        <input
          type="checkbox"
          checked={!!saved.done[step]}
          onChange={(e) => mark(step, e.target.checked)}
          className="accent-[#00F0FF]"
        />
        Done
      </label>
    ) : null;

  return (
    <div className="rounded-xl border border-white/10 p-3" aria-label="Connect your AWS account">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-2 text-left"
      >
        <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono">
          Connect your AWS account ·{' '}
          <span data-testid="setup-progress">
            {count} of 6 steps {live ? '· connected' : 'done'}
          </span>
        </span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-zinc-400" aria-hidden="true" />
        ) : (
          <ChevronDown className="w-4 h-4 text-zinc-400" aria-hidden="true" />
        )}
      </button>

      {open && (
        <ol className="mt-2">
          <Step
            n={1}
            title="Choose the recovery region and turn on Elastic Disaster Recovery"
            done={done.region}
          >
            <p>
              Pick the AWS Region your servers will recover into, away from where they run today.
              Elastic Disaster Recovery must be initialized once in that Region: open its console
              there and follow the first-time setup (it saves the default replication settings), or
              run{' '}
              <code className="text-zinc-200">
                aws drs initialize-service --region {saved.region}
              </code>{' '}
              as an account administrator.
            </p>
            <label className="flex flex-col gap-1 w-fit max-w-full">
              <span className="text-[10px] uppercase tracking-widest text-zinc-500">
                Recovery region
              </span>
              <select
                value={saved.region}
                onChange={(e) => update({ ...saved, region: e.target.value })}
                disabled={!isAdmin}
                className="bg-aether-panel border border-white/10 rounded-lg px-2.5 py-2 text-zinc-200 text-xs focus:outline-none focus:border-aether-cyan/50 max-w-full"
              >
                {DRS_REGIONS.map(([id, name]) => (
                  <option key={id} value={id}>
                    {id} · {name}
                  </option>
                ))}
              </select>
            </label>
            <a
              href={`https://console.aws.amazon.com/drs/home?region=${saved.region}`}
              target="_blank"
              rel="noreferrer noopener"
              className="text-aether-cyan hover:underline w-fit"
            >
              Open Elastic Disaster Recovery in {saved.region} ↗
            </a>
            {tick('region')}
          </Step>

          <Step n={2} title="Open the network path from your servers" done={done.network}>
            <p>Each server you protect needs outbound access (all traffic is TLS-encrypted):</p>
            <ul className="list-disc pl-5 space-y-0.5">
              <li>
                TCP 443 to <span className="text-zinc-200">drs.{saved.region}.amazonaws.com</span>{' '}
                and the Elastic Disaster Recovery S3 buckets in {saved.region}
              </li>
              <li>
                TCP 1500 to the replication servers in the staging-area subnet (replicated data)
              </li>
            </ul>
            <p>
              Use a private connection (VPN or Direct Connect) if you have one; otherwise data
              crosses the internet encrypted.
            </p>
            {tick('network')}
          </Step>

          <Step n={3} title="Install the replication agent on each server" done={done.agent}>
            <p>
              Run as root or Administrator. Use short-lived credentials from a role with the AWS
              managed policy{' '}
              <span className="text-zinc-200">
                AWSElasticDisasterRecoveryAgentInstallationPolicy
              </span>
              , never long-lived keys. Initial sync copies every disk once and can take hours.
            </p>
            <CodeBlock label="Linux" text={cmds.linux} />
            <CodeBlock label="Windows (PowerShell)" text={cmds.windows} />
            {tick('agent')}
          </Step>

          <Step n={4} title="Create the collector token" done={done.token}>
            <p>
              The collector proves it is yours with this token. It is shown once and stored only as
              a hash.
              {token && ` Current token ends in …${token.hint}.`}
            </p>
            {isAdmin ? (
              <button
                type="button"
                onClick={() => void createToken()}
                disabled={busy}
                className="w-fit inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-aether-cyan/15 hover:bg-aether-cyan/25 border border-aether-cyan/40 text-aether-cyan disabled:opacity-40"
              >
                {token ? 'Create a new token (replaces the current one)' : 'Create token'}
              </button>
            ) : (
              <p>An admin creates the token.</p>
            )}
            {fresh && (
              <p className="text-aether-amber">
                New token created and placed in the Terraform settings below. Copy them now: the
                token is not shown again.
              </p>
            )}
            {error && (
              <p role="alert" className="text-red-300">
                {error}
              </p>
            )}
          </Step>

          <Step n={5} title="Deploy the collector with Terraform" done={done.deploy}>
            <p>
              From the AetherVault repository, with credentials for your AWS account. The collector
              is one Lambda with read-only Elastic Disaster Recovery access; it fits the Lambda free
              tier.
            </p>
            {endpoint.isLocal && (
              <p className="text-aether-amber">
                This console uses a local database ({endpoint.url}). A collector in AWS cannot reach
                it; deploy against the hosted console.
              </p>
            )}
            <CodeBlock
              label="collector/terraform/terraform.tfvars"
              text={tfvars(saved.region, endpoint.url, endpoint.anonKey, fresh)}
            />
            <CodeBlock
              label="Commands"
              text={[
                'npm ci --legacy-peer-deps',
                'npm run collector:package',
                'cd collector/terraform',
                'terraform init',
                'terraform plan -out tfplan',
                'terraform apply tfplan',
              ].join('\n')}
            />
            {tick('deploy')}
          </Step>

          <Step n={6} title="Confirm live data" done={done.live}>
            <p data-testid="setup-live">
              {live && status
                ? `Connected: ${status.serverCount} server${status.serverCount === 1 ? '' : 's'} reporting from account ${status.awsAccountId ?? 'unknown'} in ${status.awsRegion}.`
                : realData
                  ? 'Reports have arrived but none in the last 5 minutes. Check the Lambda logs in CloudWatch (/aws/lambda/aethervault-drs-collector).'
                  : status?.source === 'fixture'
                    ? 'Only sample data so far. Waiting for the first report from your AWS account…'
                    : 'Waiting for the first report from your AWS account… (checked every 30 seconds)'}
            </p>
            {live && (
              <p>
                Next: run a drill from the Drills tab. Its evidence report will include the measured
                data loss.
              </p>
            )}
          </Step>
        </ol>
      )}
    </div>
  );
}
