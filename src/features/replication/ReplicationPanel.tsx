import { Copy, KeyRound, RefreshCw } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import type {
  IngestTokenStatus,
  LagPoint,
  MemberRole,
  ReplicationCapability,
  ReplicationStatus,
  ServerHealth,
} from '../../domain/dr';
import { SUPABASE_ANON_KEY, SUPABASE_URL, isLocalBackend } from '../../config/backend';
import TelemetrySparkline from '../telemetry/TelemetrySparkline';
import ConnectAwsWizard from './ConnectAwsWizard';

const errText = (e: unknown) => (e instanceof Error ? e.message : String(e));

/** No snapshot for this long means the collector has stopped reporting. */
export const STALE_AFTER_MS = 5 * 60_000;
const POLL_MS = 30_000;

export const HEALTH_LABEL: Record<ServerHealth, string> = {
  healthy: 'Replicating',
  lagging: 'Catching up',
  syncing: 'Initial sync',
  stalled: 'Stalled',
  stopped: 'Stopped',
  unknown: 'Unknown',
};

const HEALTH_CLASS: Record<ServerHealth, string> = {
  healthy: 'text-aether-green',
  lagging: 'text-aether-amber',
  syncing: 'text-aether-cyan',
  stalled: 'text-red-300',
  stopped: 'text-red-300',
  unknown: 'text-zinc-400',
};

/** 1536 -> "1.5 KiB", 3221225472 -> "3 GiB". */
export function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  const units = ['KiB', 'MiB', 'GiB', 'TiB', 'PiB'];
  let v = n;
  let i = -1;
  do {
    v /= 1024;
    i++;
  } while (v >= 1024 && i < units.length - 1);
  return `${Number(v.toFixed(v < 10 ? 1 : 0))} ${units[i]}`;
}

/** Lag in plain words: "2 s", "2 min 10 s", "1 h 5 min", or "unknown". */
export function formatLag(s: number | null): string {
  if (s === null) return 'unknown';
  if (s < 60) return `${Number(s.toFixed(1))} s`;
  if (s < 3600) {
    const m = Math.floor(s / 60);
    const r = Math.round(s % 60);
    return r ? `${m} min ${r} s` : `${m} min`;
  }
  const h = Math.floor(s / 3600);
  const m = Math.round((s % 3600) / 60);
  return m ? `${h} h ${m} min` : `${h} h`;
}

/** "20 s ago", "4 min ago", "3 h ago", from server-relative times (no client clock skew). */
export function ago(iso: string | null, serverNow: string): string {
  if (!iso) return 'never';
  const s = Math.max(0, (new Date(serverNow).getTime() - new Date(iso).getTime()) / 1000);
  if (s < 90) return `${Math.round(s)} s ago`;
  if (s < 5400) return `${Math.round(s / 60)} min ago`;
  if (s < 172800) return `${Math.round(s / 3600)} h ago`;
  return `${Math.round(s / 86400)} days ago`;
}

export type Freshness = 'live' | 'stale' | 'sample';

export function freshness(status: ReplicationStatus): Freshness {
  if (status.source === 'fixture') return 'sample';
  const age = new Date(status.serverNow).getTime() - new Date(status.receivedAt).getTime();
  return age > STALE_AFTER_MS ? 'stale' : 'live';
}

const BADGE: Record<Freshness, { text: string; className: string }> = {
  live: {
    text: 'LIVE · AWS DRS',
    className: 'border-aether-green/40 bg-aether-green/10 text-aether-green',
  },
  stale: {
    text: 'STALE · COLLECTOR NOT REPORTING',
    className: 'border-aether-amber/40 bg-aether-amber/10 text-aether-amber',
  },
  sample: {
    text: 'SAMPLE DATA · NOT A REAL ACCOUNT',
    className: 'border-aether-amber/40 bg-aether-amber/10 text-aether-amber',
  },
};

function Tile({
  label,
  value,
  sub,
  tone,
}: {
  label: string;
  value: string;
  sub?: string;
  tone?: string;
}) {
  return (
    <div className="flex-1 min-w-[9rem] rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2.5">
      <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">{label}</p>
      <p className={`mt-1 text-sm font-mono font-semibold ${tone ?? 'text-white'}`}>{value}</p>
      {sub && <p className="text-[11px] font-mono text-zinc-500 mt-0.5">{sub}</p>}
    </div>
  );
}

function ConnectAws({
  replication,
  isAdmin,
  token,
  onChanged,
}: {
  replication: ReplicationCapability;
  isAdmin: boolean;
  token: IngestTokenStatus | null;
  onChanged: () => void;
}) {
  const [fresh, setFresh] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const create = async () => {
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
      setCopied(false);
      onChanged();
    } catch (e) {
      setError(errText(e));
    } finally {
      setBusy(false);
    }
  };

  const revoke = async () => {
    if (
      !window.confirm('Revoke the token? The collector will be rejected until a new token is set.')
    )
      return;
    setBusy(true);
    setError(null);
    try {
      await replication.revokeToken();
      setFresh(null);
      onChanged();
    } catch (e) {
      setError(errText(e));
    } finally {
      setBusy(false);
    }
  };

  const copy = async () => {
    if (!fresh) return;
    try {
      await navigator.clipboard.writeText(fresh);
      setCopied(true);
    } catch {
      setError('Copy failed; select the token and copy it manually.');
    }
  };

  return (
    <div
      className="flex flex-col gap-3 rounded-xl border border-white/10 p-3"
      aria-label="Connect AWS"
    >
      <div className="flex items-start gap-2">
        <KeyRound className="w-4 h-4 mt-0.5 text-aether-cyan shrink-0" aria-hidden="true" />
        <div className="min-w-0 text-[11px] font-mono text-zinc-400">
          <p className="text-[10px] uppercase tracking-widest text-zinc-500">Connect AWS</p>
          <p className="mt-1 max-w-2xl">
            A small read-only collector runs in your AWS account (Lambda with the AWS managed policy{' '}
            <span className="text-zinc-200">AWSElasticDisasterRecoveryReadOnlyAccess</span>) and
            sends replication status every minute: state, lag, backlog and error codes. No server
            data and no AWS credentials leave your account.
          </p>
          <p className="mt-2" data-testid="token-status">
            {token
              ? `Collector token …${token.hint}, created ${new Date(token.createdAt).toLocaleString()}; ${token.lastUsedAt ? `last used ${new Date(token.lastUsedAt).toLocaleString()}` : 'not used yet'}.`
              : 'No collector token yet.'}
          </p>
        </div>
      </div>

      {fresh && (
        <div className="rounded-lg border border-aether-amber/40 bg-aether-amber/5 p-3 flex flex-col gap-2">
          <p className="text-[11px] font-mono text-aether-amber">
            Copy this token now. It is shown once; only a hash is stored.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <code
              data-testid="new-token"
              className="min-w-0 flex-1 break-all rounded bg-black/40 px-2 py-1.5 text-xs text-white select-all"
            >
              {fresh}
            </code>
            <button
              type="button"
              onClick={() => void copy()}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-xs font-mono text-zinc-200"
            >
              <Copy className="w-3.5 h-3.5" aria-hidden="true" />
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <p className="text-[11px] font-mono text-zinc-400">
            Put it in the collector&apos;s <span className="text-zinc-200">ingest_token</span>{' '}
            (Terraform module in <span className="text-zinc-200">collector/terraform</span>) or the{' '}
            <span className="text-zinc-200">AETHERVAULT_INGEST_TOKEN</span> environment variable.
          </p>
        </div>
      )}

      {isAdmin ? (
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            disabled={busy}
            onClick={() => void create()}
            className="px-4 py-2 rounded-xl bg-aether-cyan/15 hover:bg-aether-cyan/25 border border-aether-cyan/40 text-xs font-mono text-aether-cyan hover:text-white disabled:opacity-60"
          >
            {token ? 'Rotate token' : 'Create collector token'}
          </button>
          {token && (
            <button
              type="button"
              disabled={busy}
              onClick={() => void revoke()}
              className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-aether-red/20 border border-white/10 text-xs font-mono text-zinc-300 disabled:opacity-60"
            >
              Revoke
            </button>
          )}
        </div>
      ) : (
        <p className="text-[11px] font-mono text-zinc-500">
          Only admins manage the collector token.
        </p>
      )}
      {error && (
        <p role="alert" className="text-xs font-mono text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}

const DEFAULT_ENDPOINT = { url: SUPABASE_URL, anonKey: SUPABASE_ANON_KEY, isLocal: isLocalBackend };

export default function ReplicationPanel({
  replication,
  myRole,
  refreshKey,
  orgId = 'default',
  endpoint = DEFAULT_ENDPOINT,
}: {
  replication: ReplicationCapability;
  myRole: MemberRole;
  refreshKey: number | string;
  /** Scopes the setup guide's per-browser progress. */
  orgId?: string;
  /** Where a deployed collector sends reports (this console's backend). */
  endpoint?: { url: string; anonKey: string; isLocal: boolean };
}) {
  const isAdmin = myRole === 'admin';
  const [status, setStatus] = useState<ReplicationStatus | null | undefined>(undefined);
  const [history, setHistory] = useState<LagPoint[]>([]);
  const [token, setToken] = useState<IngestTokenStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const [s, h, t] = await Promise.all([
        replication.latest(),
        replication.history(),
        replication.tokenStatus(),
      ]);
      setStatus(s);
      setHistory(h);
      setToken(t);
      setError(null);
    } catch (e) {
      setError(errText(e));
    }
  }, [replication]);

  useEffect(() => {
    void load();
    const t = window.setInterval(() => void load(), POLL_MS);
    return () => window.clearInterval(t);
  }, [load, refreshKey]);

  const fresh = status ? freshness(status) : null;
  const lagSeries = history.map((p) => p.maxLagSeconds ?? 0);

  return (
    <section
      aria-labelledby="replication-title"
      className="w-full mb-4 rounded-[2rem] border border-white/10 bg-aether-panel/40 backdrop-blur-3xl p-4 sm:p-6 flex flex-col gap-4"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h2
            id="replication-title"
            className="text-sm font-mono uppercase tracking-widest text-white"
          >
            Replication · AWS Elastic Disaster Recovery
          </h2>
          <p className="text-[11px] font-mono text-zinc-400 mt-1">
            {status
              ? `Account ${status.awsAccountId ?? 'unknown'} · ${status.awsRegion} · collected ${ago(status.collectedAt, status.serverNow)}`
              : 'Real replication status from your AWS account, once the collector is connected.'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {fresh && (
            <span
              data-testid="replication-badge"
              className={`rounded-md border px-2 py-0.5 text-[10px] font-mono tracking-wider ${BADGE[fresh].className}`}
            >
              {BADGE[fresh].text}
            </span>
          )}
          <button
            type="button"
            onClick={() => void load()}
            aria-label="Refresh replication status"
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.06]"
          >
            <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {error && (
        <p role="alert" className="text-xs font-mono text-red-300">
          {error}
        </p>
      )}

      {status === undefined ? (
        <p className="text-xs font-mono text-zinc-500">Loading replication status…</p>
      ) : status === null ? (
        <p className="text-xs font-mono text-zinc-500">No replication data received yet.</p>
      ) : (
        <>
          {fresh === 'stale' && (
            <p className="text-[11px] font-mono text-aether-amber">
              No update for over 5 minutes. The figures below are the last ones received; check the
              collector&apos;s Lambda logs in the AWS account.
            </p>
          )}
          <div className="flex flex-wrap gap-3">
            <Tile
              label="Data-loss target"
              value={status.rpoMet === null ? 'Unknown' : status.rpoMet ? 'Met' : 'At risk'}
              tone={
                status.rpoMet === null
                  ? 'text-zinc-300'
                  : status.rpoMet
                    ? 'text-aether-green'
                    : 'text-red-300'
              }
              sub={`worst lag ${formatLag(status.maxLagSeconds)} · target ${formatLag(status.rpoTargetSeconds)}`}
            />
            <Tile
              label="Servers replicating"
              value={`${status.healthyCount} of ${status.serverCount}`}
              tone={status.problemCount ? 'text-aether-amber' : 'text-white'}
              sub={status.problemCount ? `${status.problemCount} need attention` : 'all normal'}
            />
            <Tile
              label="Backlog"
              value={formatBytes(status.backlogBytes)}
              sub="waiting to replicate"
            />
          </div>
          {lagSeries.length >= 2 && (
            <TelemetrySparkline
              data={lagSeries}
              color="#00F0FF"
              fillId="replication-lag-fill"
              label={`Worst lag, last ${lagSeries.length} reports`}
              currentValue={formatLag(status.maxLagSeconds)}
              unit=""
            />
          )}
          <div className="relative overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full min-w-[680px] text-left text-xs font-mono">
              <caption className="sr-only">Replicating servers</caption>
              <thead className="text-[10px] uppercase tracking-widest text-zinc-500 bg-white/[0.02]">
                <tr>
                  <th scope="col" className="px-3 py-2">
                    Server
                  </th>
                  <th scope="col" className="px-3 py-2">
                    Status
                  </th>
                  <th scope="col" className="px-3 py-2">
                    Lag
                  </th>
                  <th scope="col" className="px-3 py-2">
                    Backlog
                  </th>
                  <th scope="col" className="px-3 py-2">
                    Last seen
                  </th>
                </tr>
              </thead>
              <tbody>
                {status.servers.map((s) => {
                  const pct = s.totalBytes
                    ? Math.floor((s.replicatedBytes / s.totalBytes) * 100)
                    : null;
                  return (
                    <tr
                      key={s.id}
                      data-testid={`server-${s.hostname}`}
                      className="border-t border-white/5 text-zinc-300 align-top"
                    >
                      <td className="px-3 py-2">
                        {s.hostname}
                        <span className="block text-zinc-500">{s.id}</span>
                      </td>
                      <td className="px-3 py-2">
                        <span className={HEALTH_CLASS[s.health]}>{HEALTH_LABEL[s.health]}</span>
                        <span className="block text-zinc-500">
                          {s.state}
                          {s.error ? ` · ${s.error}` : ''}
                          {s.health === 'syncing' && pct !== null ? ` · ${pct}%` : ''}
                          {s.etaAt && s.health === 'syncing'
                            ? ` · ETA ${new Date(s.etaAt).toLocaleString()}`
                            : ''}
                        </span>
                      </td>
                      <td
                        className="px-3 py-2 whitespace-nowrap tabular-nums"
                        title={s.lagRaw ?? undefined}
                      >
                        {formatLag(s.lagSeconds)}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap tabular-nums">
                        {formatBytes(s.backlogBytes)}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        {ago(s.lastSeenAt, status.serverNow)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      {status !== undefined && (
        <ConnectAwsWizard
          key={orgId}
          orgId={orgId}
          replication={replication}
          isAdmin={isAdmin}
          token={token}
          status={status}
          live={fresh === 'live'}
          endpoint={endpoint}
          onChanged={() => void load()}
        />
      )}

      <ConnectAws
        replication={replication}
        isAdmin={isAdmin}
        token={token}
        onChanged={() => void load()}
      />
    </section>
  );
}
