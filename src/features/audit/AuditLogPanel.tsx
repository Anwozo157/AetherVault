import { Download, ShieldAlert, ShieldCheck } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { AuditCapability, AuditRecord, ChainReport } from '../../domain/dr';
import { ACTION_LABEL, describeDetail, toCsv } from './auditFormat';

const PAGE = 100;

export default function AuditLogPanel({
  audit,
  refreshKey,
}: {
  audit: AuditCapability;
  /** Changes when new activity arrives, so the list reloads. */
  refreshKey: number;
}) {
  const [records, setRecords] = useState<AuditRecord[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<ChainReport | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [action, setAction] = useState('');
  const [actor, setActor] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const page = await audit.list({ limit: PAGE });
      setRecords(page);
      setHasMore(page.length === PAGE);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, [audit]);

  useEffect(() => {
    void load();
  }, [load, refreshKey]);

  const loadOlder = async () => {
    const oldest = records[records.length - 1];
    if (!oldest) return;
    try {
      const page = await audit.list({ limit: PAGE, before: oldest.id });
      setRecords((prev) => [...prev, ...page]);
      setHasMore(page.length === PAGE);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  };

  const verify = async () => {
    setVerifying(true);
    setError(null);
    try {
      setReport(await audit.verify());
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setVerifying(false);
    }
  };

  const exportCsv = () => {
    const blob = new Blob([toCsv(records, report)], { type: 'text/csv;charset=utf-8' });
    const href = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = href;
    a.download = `aethervault-audit-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(href);
  };

  const actions = useMemo(() => [...new Set(records.map((r) => r.action))].sort(), [records]);
  const shown = records.filter(
    (r) =>
      (!action || r.action === action) &&
      (!actor || (r.actorEmail ?? 'system').toLowerCase().includes(actor.toLowerCase())),
  );

  const control =
    'bg-aether-panel border border-white/10 rounded-lg px-2.5 py-1.5 text-zinc-200 font-mono text-xs focus:outline-none focus:border-aether-cyan/50';

  return (
    <section
      aria-labelledby="audit-title"
      className="w-full rounded-[2rem] border border-white/10 bg-aether-panel/40 backdrop-blur-3xl p-4 sm:p-6 flex flex-col gap-4"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 id="audit-title" className="text-sm font-mono uppercase tracking-widest text-white">
            Audit log
          </h2>
          <p className="text-[11px] font-mono text-zinc-400 mt-1 max-w-xl">
            Append-only. Each entry stores a SHA-256 fingerprint of the one before it, so changing
            any past entry breaks the chain.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => void verify()}
            disabled={verifying}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-aether-green/10 hover:bg-aether-green/20 border border-aether-green/40 text-xs font-mono text-aether-green hover:text-white transition-colors disabled:opacity-50"
          >
            <ShieldCheck className="w-4 h-4" aria-hidden="true" />
            {verifying ? 'Verifying…' : 'Verify chain'}
          </button>
          <button
            type="button"
            onClick={exportCsv}
            disabled={records.length === 0}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-colors disabled:opacity-50"
          >
            <Download className="w-4 h-4" aria-hidden="true" />
            Export CSV
          </button>
        </div>
      </div>

      {report && (
        <p
          role="status"
          className={`flex items-start gap-2 text-xs font-mono rounded-xl px-3 py-2 border ${
            report.ok
              ? 'text-aether-green border-aether-green/30 bg-aether-green/5'
              : 'text-red-300 border-aether-red/40 bg-aether-red/10'
          }`}
        >
          {report.ok ? (
            <ShieldCheck className="w-4 h-4 shrink-0" aria-hidden="true" />
          ) : (
            <ShieldAlert className="w-4 h-4 shrink-0" aria-hidden="true" />
          )}
          <span>
            {report.ok
              ? `Chain intact: ${report.checked} ${report.checked === 1 ? 'entry' : 'entries'} verified at ${new Date(report.verifiedAt).toLocaleTimeString()}.`
              : `Tampering detected: entry #${report.brokenId} was altered after it was written. ${report.checked} entries checked.`}
            {report.headHash && (
              <span className="block text-zinc-500">
                Latest fingerprint {report.headHash.slice(0, 16)}…
              </span>
            )}
          </span>
        </p>
      )}

      <div className="flex flex-wrap gap-2">
        <select
          aria-label="Filter by action"
          value={action}
          onChange={(e) => setAction(e.target.value)}
          className={`${control} w-full sm:w-auto`}
        >
          <option value="">All actions</option>
          {actions.map((a) => (
            <option key={a} value={a}>
              {ACTION_LABEL[a] ?? a}
            </option>
          ))}
        </select>
        <input
          aria-label="Filter by person"
          placeholder="Filter by person"
          value={actor}
          onChange={(e) => setActor(e.target.value)}
          className={`${control} w-full sm:w-56`}
        />
        <span className="self-center text-[11px] font-mono text-zinc-500">
          {shown.length} of {records.length}
          {hasMore ? '+' : ''} {records.length === 1 && !hasMore ? 'entry' : 'entries'}
        </span>
      </div>

      {error && (
        <p role="alert" className="text-xs font-mono text-red-300">
          {error}
        </p>
      )}

      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full min-w-[640px] text-left text-xs font-mono">
          <caption className="sr-only">Audit log entries, newest first</caption>
          <thead className="text-[10px] uppercase tracking-widest text-zinc-500 bg-white/[0.02]">
            <tr>
              <th scope="col" className="px-3 py-2">
                #
              </th>
              <th scope="col" className="px-3 py-2">
                Time
              </th>
              <th scope="col" className="px-3 py-2">
                Person
              </th>
              <th scope="col" className="px-3 py-2">
                Action
              </th>
              <th scope="col" className="px-3 py-2">
                Details
              </th>
              <th scope="col" className="px-3 py-2">
                Fingerprint
              </th>
            </tr>
          </thead>
          <tbody>
            {loading && records.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-3 py-6 text-center text-zinc-500">
                  Loading audit log…
                </td>
              </tr>
            ) : shown.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-3 py-6 text-center text-zinc-500">
                  No entries match.
                </td>
              </tr>
            ) : (
              shown.map((r) => {
                const broken = report?.brokenId === r.id;
                return (
                  <tr
                    key={r.id}
                    data-testid={`audit-row-${r.id}`}
                    className={`border-t border-white/5 ${broken ? 'bg-aether-red/15 text-red-200' : 'text-zinc-300'}`}
                  >
                    <td className="px-3 py-2 text-zinc-500 tabular-nums">{r.id}</td>
                    <td className="px-3 py-2 whitespace-nowrap tabular-nums" title={r.createdAt}>
                      {new Date(r.createdAt).toLocaleString()}
                    </td>
                    <td className="px-3 py-2">{r.actorEmail ?? 'system'}</td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      {broken && <span className="sr-only">Altered entry: </span>}
                      {ACTION_LABEL[r.action] ?? r.action}
                    </td>
                    <td className="px-3 py-2 text-zinc-400">{describeDetail(r)}</td>
                    <td className="px-3 py-2 text-zinc-500" title={r.hash}>
                      {r.hash.slice(0, 10)}…
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {hasMore && (
        <button
          type="button"
          onClick={() => void loadOlder()}
          className="self-center px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-zinc-300"
        >
          Load older entries
        </button>
      )}
    </section>
  );
}
