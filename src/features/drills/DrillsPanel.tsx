import { FileText } from 'lucide-react';
import { useCallback, useEffect, useState, type FormEvent } from 'react';
import type {
  DrillEvidence,
  DrillsCapability,
  MemberRole,
  RecoveryObjectives,
  RunSummary,
} from '../../domain/dr';
import DrillSchedule from './DrillSchedule';
import EvidenceReport from './EvidenceReport';
import { OUTCOME_LABEL, formatSeconds, runPassed } from './evidence';

const errText = (e: unknown) => (e instanceof Error ? e.message : String(e));

export default function DrillsPanel({
  drills,
  myRole,
  refreshKey,
}: {
  drills: DrillsCapability;
  myRole: MemberRole;
  refreshKey: number | string;
}) {
  const isAdmin = myRole === 'admin';
  const [objectives, setObjectives] = useState<RecoveryObjectives | null>(null);
  const [rtoMin, setRtoMin] = useState('');
  const [rpoSec, setRpoSec] = useState('');
  const [runs, setRuns] = useState<RunSummary[] | null>(null);
  const [report, setReport] = useState<DrillEvidence | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const load = useCallback(async () => {
    try {
      const [o, r] = await Promise.all([drills.getObjectives(), drills.listRuns()]);
      setObjectives(o);
      setRtoMin(String(+(o.rtoSeconds / 60).toFixed(2)));
      setRpoSec(String(o.rpoSeconds));
      setRuns(r);
    } catch (e) {
      setError(errText(e));
    }
  }, [drills]);

  useEffect(() => {
    void load();
  }, [load, refreshKey]);

  const save = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaved(false);
    try {
      await drills.setObjectives({
        rtoSeconds: Math.round(Number(rtoMin) * 60),
        rpoSeconds: Math.round(Number(rpoSec)),
      });
      setSaved(true);
      await load();
    } catch (err) {
      setError(errText(err));
    }
  };

  const open = async (runId: string) => {
    setError(null);
    try {
      setReport(await drills.evidence(runId));
    } catch (e) {
      setError(errText(e));
    }
  };

  const control =
    'bg-aether-panel border border-white/10 rounded-lg px-2.5 py-2 text-zinc-200 font-mono text-xs focus:outline-none focus:border-aether-cyan/50 w-24';

  const completed = runs?.filter((r) => r.outcome === 'secured') ?? [];
  const passed = completed.filter((r) =>
    runPassed(
      r.recoverySeconds === null ? null : r.recoverySeconds <= r.rtoTargetSeconds,
      r.rpoMet,
    ),
  );

  return (
    <section
      aria-labelledby="drills-title"
      className="w-full rounded-[2rem] border border-white/10 bg-aether-panel/40 backdrop-blur-3xl p-4 sm:p-6 flex flex-col gap-5"
    >
      <div>
        <h2 id="drills-title" className="text-sm font-mono uppercase tracking-widest text-white">
          Drills & evidence
        </h2>
        <p className="text-[11px] font-mono text-zinc-400 mt-1 max-w-2xl">
          Every drill and failover produces an evidence report: who started or approved it, the
          timeline, and whether recovery met your target. AWS recommends testing recovery regularly
          to confirm your objectives are met.
        </p>
      </div>

      <form
        onSubmit={(e) => void save(e)}
        aria-label="Recovery objectives"
        className="flex flex-wrap items-end gap-3 rounded-xl border border-white/10 p-3"
      >
        <label className="flex flex-col gap-1 text-[10px] font-mono uppercase tracking-widest text-zinc-500">
          Recovery time target (minutes)
          <input
            type="number"
            min="0.1"
            step="any"
            required
            disabled={!isAdmin}
            value={rtoMin}
            onChange={(e) => setRtoMin(e.target.value)}
            className={control}
          />
        </label>
        <label className="flex flex-col gap-1 text-[10px] font-mono uppercase tracking-widest text-zinc-500">
          Data-loss target (seconds)
          <input
            type="number"
            min="0"
            step="1"
            required
            disabled={!isAdmin}
            value={rpoSec}
            onChange={(e) => setRpoSec(e.target.value)}
            className={control}
          />
        </label>
        {isAdmin ? (
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-aether-cyan/15 hover:bg-aether-cyan/25 border border-aether-cyan/40 text-xs font-mono text-aether-cyan hover:text-white"
          >
            Save targets
          </button>
        ) : (
          <span className="text-[11px] font-mono text-zinc-500">Only admins change targets.</span>
        )}
        {saved && (
          <span role="status" className="text-[11px] font-mono text-aether-green">
            Saved and recorded in the audit log.
          </span>
        )}
        {objectives && (
          <span className="basis-full text-[11px] font-mono text-zinc-500">
            {completed.length
              ? `${passed.length} of ${completed.length} completed drills passed: recovered within ${formatSeconds(objectives.rtoSeconds)}, and data loss within ${formatSeconds(objectives.rpoSeconds)} where measured.`
              : 'No completed drills yet. Run one now or set a schedule below.'}
          </span>
        )}
      </form>

      <DrillSchedule
        drills={drills}
        myRole={myRole}
        refreshKey={refreshKey}
        onChanged={() => void load()}
      />

      {error && (
        <p role="alert" className="text-xs font-mono text-red-300">
          {error}
        </p>
      )}

      <div className="relative overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full min-w-[720px] text-left text-xs font-mono">
          <caption className="sr-only">Drills and failovers, newest first</caption>
          <thead className="text-[10px] uppercase tracking-widest text-zinc-500 bg-white/[0.02]">
            <tr>
              <th scope="col" className="px-3 py-2">
                Requested
              </th>
              <th scope="col" className="px-3 py-2">
                Type
              </th>
              <th scope="col" className="px-3 py-2">
                Route
              </th>
              <th scope="col" className="px-3 py-2">
                People
              </th>
              <th scope="col" className="px-3 py-2">
                Outcome
              </th>
              <th scope="col" className="px-3 py-2">
                Recovery
              </th>
              <th scope="col" className="px-3 py-2">
                <span className="sr-only">Report</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {runs === null ? (
              <tr>
                <td colSpan={7} className="px-3 py-6 text-center text-zinc-500">
                  Loading drills…
                </td>
              </tr>
            ) : runs.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-3 py-6 text-center text-zinc-500">
                  No drills yet.
                </td>
              </tr>
            ) : (
              runs.map((r) => {
                const met = runPassed(
                  r.recoverySeconds !== null ? r.recoverySeconds <= r.rtoTargetSeconds : null,
                  r.rpoMet,
                );
                return (
                  <tr
                    key={r.id}
                    data-testid={`drill-${r.id}`}
                    className="border-t border-white/5 text-zinc-300"
                  >
                    <td className="px-3 py-2 whitespace-nowrap tabular-nums">
                      {new Date(r.requestedAt).toLocaleString()}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      {r.kind === 'drill' ? (
                        <span className="text-aether-cyan">
                          Drill
                          <span className="block text-zinc-500">{r.trigger}</span>
                        </span>
                      ) : (
                        <span className="text-aether-amber">Failover</span>
                      )}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      {r.sourceRegion} → {r.targetRegion}
                    </td>
                    <td className="px-3 py-2 text-zinc-400">
                      {r.kind === 'drill' ? (
                        <>
                          {r.trigger === 'scheduled' ? 'Scheduler' : (r.requestedByEmail ?? '?')}
                          <span className="block text-zinc-500">isolated · no approval needed</span>
                        </>
                      ) : (
                        <>
                          {r.requestedByEmail ?? '?'}
                          <span className="block text-zinc-500">
                            {r.approvedByEmail
                              ? `approved by ${r.approvedByEmail}`
                              : 'not approved'}
                          </span>
                        </>
                      )}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">{OUTCOME_LABEL[r.outcome]}</td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      {met === null ? (
                        <span className="text-zinc-500">n/a</span>
                      ) : (
                        <span className={met ? 'text-aether-green' : 'text-red-300'}>
                          {formatSeconds(r.recoverySeconds)} · {met ? 'PASS' : 'FAIL'}
                        </span>
                      )}
                      {r.approvedAt !== null && (
                        <span
                          className={`block ${r.rpoMet === false ? 'text-red-300' : 'text-zinc-500'}`}
                        >
                          {r.rpoMet === null
                            ? 'data loss not measured'
                            : `data loss ${r.rpoSeconds === null ? 'unknown' : formatSeconds(r.rpoSeconds)}${r.rpoMet ? '' : ' · missed'}${r.replicationSource === 'fixture' ? ' · sample' : ''}`}
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-2 text-right">
                      <button
                        type="button"
                        onClick={() => void open(r.id)}
                        aria-label={`Evidence report for ${r.kind === 'drill' ? 'drill' : 'failover'} ${new Date(r.requestedAt).toLocaleString()}`}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] text-zinc-200"
                      >
                        <FileText className="w-3.5 h-3.5" aria-hidden="true" />
                        Report
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {report && <EvidenceReport evidence={report} onClose={() => setReport(null)} />}
    </section>
  );
}
