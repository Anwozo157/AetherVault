import { Download, Printer, ShieldAlert, ShieldCheck, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import type { DrillEvidence } from '../../domain/dr';
import { ACTION_LABEL } from '../audit/auditFormat';
import {
  OUTCOME_LABEL,
  canonicalJson,
  evidenceFileName,
  fingerprint,
  formatSeconds,
  rpoSummary,
  runPassed,
} from './evidence';

const time = (iso: string | null) => (iso ? new Date(iso).toLocaleString() : 'n/a');

/** Printable, downloadable evidence that one failover drill met (or missed) its objectives. */
export default function EvidenceReport({
  evidence,
  onClose,
}: {
  evidence: DrillEvidence;
  onClose: () => void;
}) {
  const [hash, setHash] = useState<string | null>(null);
  const { run, results, objectives, chain } = evidence;

  useEffect(() => {
    let cancelled = false;
    void fingerprint(evidence).then((h) => !cancelled && setHash(h));
    return () => {
      cancelled = true;
    };
  }, [evidence]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const download = () => {
    const blob = new Blob([canonicalJson(evidence) + '\n'], { type: 'application/json' });
    const href = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = href;
    a.download = evidenceFileName(evidence);
    a.click();
    URL.revokeObjectURL(href);
  };

  const passed = runPassed(results.rto_met, results.rpo_met);
  const verdict = passed === null ? 'NOT COMPLETED' : passed ? 'PASS' : 'FAIL';
  const verdictClass =
    passed === null
      ? 'text-zinc-300 border-white/20'
      : passed
        ? 'text-aether-green border-aether-green/40'
        : 'text-red-300 border-aether-red/50';

  const isDrill = run.kind === 'drill';
  const row = (label: string, value: string) => (
    <div className="grid grid-cols-[10rem_minmax(0,1fr)] gap-3 py-1.5 border-b border-white/5 print:border-black/10">
      <dt className="text-zinc-500 print:text-black/60">{label}</dt>
      <dd className="text-zinc-200 break-words print:text-black">{value}</dd>
    </div>
  );

  // Rendered at the top level of <body>, so printing can drop the rest of the app entirely.
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="evidence-title"
      className="evidence-overlay fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md p-3 sm:p-8"
    >
      <article className="print-area mx-auto max-w-3xl rounded-3xl border border-white/10 bg-aether-panel p-5 sm:p-8 font-mono text-xs print:max-w-none print:rounded-none print:border-0 print:bg-white print:p-0">
        <header className="flex flex-wrap items-start justify-between gap-3 border-b border-white/10 pb-4 print:border-black/20">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-widest text-zinc-500 print:text-black/60">
              AetherVault ·{' '}
              {isDrill
                ? `${run.trigger === 'scheduled' ? 'Scheduled' : 'On-demand'} drill evidence (isolated, no production cutover)`
                : 'Failover evidence'}
            </p>
            <h2
              id="evidence-title"
              className="mt-1 text-lg font-bold text-white font-sans print:text-black"
            >
              {run.source_region} → {run.target_region}
            </h2>
            <p className="text-zinc-400 print:text-black/70">
              {evidence.organization.name} · {time(run.requested_at)}
            </p>
          </div>
          <span
            className={`rounded-xl border px-3 py-1.5 text-sm font-bold tracking-widest ${verdictClass} print:text-black print:border-black`}
          >
            {verdict}
          </span>
        </header>

        <section className="mt-4">
          <h3 className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1 print:text-black/60">
            Result
          </h3>
          <dl>
            {row('Outcome', OUTCOME_LABEL[run.outcome])}
            {row(
              'Recovery time',
              results.recovery_seconds === null
                ? 'Not measured (drill did not complete)'
                : `${formatSeconds(results.recovery_seconds)} (target ${formatSeconds(objectives.rto_seconds)}). Simulated: recovery is not yet run against real infrastructure.`,
            )}
            {!isDrill && row('Time to approval', formatSeconds(results.decision_seconds))}
            {row('Data-loss target (RPO)', rpoSummary(evidence))}
          </dl>
        </section>

        <section className="mt-4">
          <h3 className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1 print:text-black/60">
            Controls
          </h3>
          <dl>
            {isDrill ? (
              <>
                {row(
                  'Started by',
                  run.trigger === 'scheduled' ? 'Drill scheduler' : (run.requested_by ?? 'n/a'),
                )}
                {row(
                  'Two-person rule',
                  'Not required: drills run in an isolated network and change nothing in production',
                )}
              </>
            ) : (
              <>
                {row('Requested by', run.requested_by ?? 'n/a')}
                {row('Approved by', run.approved_by ?? 'not approved')}
                {row(
                  'Two-person rule',
                  run.two_person_rule_met ? 'Met (different requester and approver)' : 'Not met',
                )}
              </>
            )}
            {row('Aborted', time(run.aborted_at))}
            {row('Reset to standby', time(run.reset_at))}
          </dl>
        </section>

        {evidence.runbook && (
          <section className="mt-4">
            <h3 className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1 print:text-black/60">
              Runbook (v{evidence.runbook.version}): {evidence.runbook.completed} of{' '}
              {evidence.runbook.total} steps done
            </h3>
            <ol className="flex flex-col">
              {evidence.runbook.steps.map((s) => (
                <li
                  key={s.id}
                  className="grid grid-cols-[1.25rem_minmax(0,1fr)] gap-1 py-1 border-b border-white/5 print:border-black/10"
                >
                  <span
                    className={s.done ? 'text-aether-green print:text-black' : 'text-zinc-600'}
                    aria-label={s.done ? 'done' : 'not done'}
                  >
                    {s.done ? '✓' : '○'}
                  </span>
                  <span className="min-w-0 break-words">
                    <span className="text-zinc-200 print:text-black">{s.title}</span>
                    <span className="block text-zinc-500 print:text-black/70">
                      {s.done
                        ? `${s.checked_by ?? 'unknown'} · ${time(s.checked_at)}${s.note ? ` · ${s.note}` : ''}`
                        : 'not done'}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </section>
        )}

        {evidence.timeline.length > 0 && (
          <section className="mt-4">
            <h3 className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1 print:text-black/60">
              Timeline
            </h3>
            <ol className="flex flex-col">
              {evidence.timeline.map((t) => (
                <li
                  key={t.stage}
                  className="flex flex-wrap justify-between gap-2 py-1 border-b border-white/5 print:border-black/10"
                >
                  <span className="text-zinc-200 print:text-black">
                    {t.stage.replace(/_/g, ' ')}
                  </span>
                  <span className="text-zinc-500 tabular-nums print:text-black/70">
                    {time(t.at)}
                  </span>
                </li>
              ))}
            </ol>
          </section>
        )}

        <section className="mt-4">
          <h3 className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1 print:text-black/60">
            Audit trail
          </h3>
          <ol className="flex flex-col">
            {evidence.audit_entries.map((a) => (
              <li
                key={a.id}
                className="grid grid-cols-[minmax(0,1fr)_auto] gap-2 py-1 border-b border-white/5 print:border-black/10"
              >
                <span className="text-zinc-200 print:text-black">
                  #{a.id} {ACTION_LABEL[a.action] ?? a.action} · {a.actor ?? 'system'}
                </span>
                <span className="text-zinc-500 print:text-black/70" title={a.hash}>
                  {a.hash.slice(0, 12)}…
                </span>
              </li>
            ))}
          </ol>
          <p
            className={`mt-2 flex items-center gap-1.5 ${chain.ok ? 'text-aether-green' : 'text-red-300'} print:text-black`}
          >
            {chain.ok ? (
              <ShieldCheck className="w-4 h-4" aria-hidden="true" />
            ) : (
              <ShieldAlert className="w-4 h-4" aria-hidden="true" />
            )}
            {chain.ok
              ? `Audit chain intact: ${chain.checked} entries verified when this report was generated.`
              : `Audit chain BROKEN at entry #${chain.broken_id}. This evidence cannot be relied on.`}
          </p>
        </section>

        <footer className="mt-5 border-t border-white/10 pt-3 text-[10px] text-zinc-500 print:border-black/20 print:text-black/60">
          <p>
            Generated {time(evidence.generated_at)} by {evidence.generated_by ?? 'unknown'} · report
            v{evidence.report_version} · run {run.id}
          </p>
          <p className="break-all">
            Report fingerprint (SHA-256 of the downloaded JSON): {hash ?? 'computing…'}
          </p>
          <p>
            Aligned with AWS Well-Architected REL13-BP01 (recovery objectives) and REL13-BP03 (test
            DR).
          </p>
        </footer>

        <div className="mt-5 flex flex-wrap gap-2 print:hidden">
          <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-aether-cyan/15 hover:bg-aether-cyan/25 border border-aether-cyan/40 text-aether-cyan hover:text-white"
          >
            <Printer className="w-4 h-4" aria-hidden="true" />
            Print / Save as PDF
          </button>
          <button
            type="button"
            onClick={download}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-zinc-200"
          >
            <Download className="w-4 h-4" aria-hidden="true" />
            Download JSON
          </button>
          <button
            type="button"
            onClick={onClose}
            className="ml-auto flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-zinc-300"
          >
            <X className="w-4 h-4" aria-hidden="true" />
            Close
          </button>
        </div>
      </article>
    </div>,
    document.body,
  );
}
