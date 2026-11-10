import { ArrowDown, ArrowUp, Check, Plus, Trash2 } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import type {
  DrillsCapability,
  MemberRole,
  Runbook,
  RunbookPhase,
  RunbooksCapability,
  RunbookStepDraft,
  RunChecklist,
  RunSummary,
} from '../../domain/dr';
import { PHASES, PHASE_LABEL, STARTER_RUNBOOK } from './template';

const errText = (e: unknown) => (e instanceof Error ? e.message : String(e));
const control =
  'bg-aether-panel border border-white/10 rounded-lg px-2.5 py-2 text-zinc-200 font-mono text-xs focus:outline-none focus:border-aether-cyan/50';
const button =
  'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono disabled:opacity-40';

function runLabel(r: RunSummary): string {
  const kind = r.kind === 'drill' ? 'Drill' : 'Failover';
  return `${kind} · ${new Date(r.requestedAt).toLocaleString()} · ${r.targetRegion}`;
}

/** The run's copy of the runbook, ticked off step by step. */
function Checklist({
  runbooks,
  runs,
  canCheck,
  refreshKey,
}: {
  runbooks: RunbooksCapability;
  runs: RunSummary[];
  canCheck: boolean;
  refreshKey: number | string;
}) {
  const choices = runs.filter((r) => r.outcome !== 'withdrawn');
  const [runId, setRunId] = useState<string | null>(null);
  const selected = runId ?? choices[0]?.id ?? null;
  const [list, setList] = useState<RunChecklist | null | undefined>(undefined);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!selected) return;
    try {
      setList(await runbooks.checklist(selected));
      setError(null);
    } catch (e) {
      setError(errText(e));
    }
  }, [runbooks, selected]);

  useEffect(() => {
    void load();
  }, [load, refreshKey]);

  const tick = async (stepId: string) => {
    if (!selected) return;
    setBusy(stepId);
    try {
      await runbooks.check(selected, stepId, notes[stepId]);
      setNotes((n) => ({ ...n, [stepId]: '' }));
      await load();
    } catch (e) {
      setError(errText(e));
    } finally {
      setBusy(null);
    }
  };

  if (!choices.length) {
    return (
      <p className="text-[11px] font-mono text-zinc-500">
        No drills or failovers yet. Start a drill on the Drills tab, then tick the steps off here.
      </p>
    );
  }

  const done = list?.steps.filter((s) => s.done).length ?? 0;
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-3">
        <label className="flex flex-col gap-1 text-[10px] uppercase tracking-widest text-zinc-500 font-mono min-w-0 max-w-full">
          Run
          <select
            value={selected ?? ''}
            onChange={(e) => {
              setRunId(e.target.value);
              setList(undefined);
            }}
            className={`${control} max-w-full`}
          >
            {choices.map((r) => (
              <option key={r.id} value={r.id}>
                {runLabel(r)}
              </option>
            ))}
          </select>
        </label>
        {list && (
          <span className="text-[11px] font-mono text-zinc-400 self-end pb-2">
            {done} of {list.steps.length} steps done · runbook v{list.version}
            {!list.open && ' · closed (older than 7 days)'}
          </span>
        )}
      </div>
      {error && (
        <p role="alert" className="text-[11px] font-mono text-red-300">
          {error}
        </p>
      )}
      {list === undefined ? (
        <p className="text-[11px] font-mono text-zinc-500">Loading checklist…</p>
      ) : list === null ? (
        <p className="text-[11px] font-mono text-zinc-500">
          This run started before your organization had a runbook, so it has no checklist.
        </p>
      ) : (
        PHASES.map((phase) => {
          const steps = list.steps.filter((s) => s.phase === phase);
          if (!steps.length) return null;
          return (
            <div key={phase}>
              <h4 className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono mb-1">
                {PHASE_LABEL[phase]}
              </h4>
              <ol className="flex flex-col">
                {steps.map((s) => (
                  <li
                    key={s.id}
                    data-testid={`check-${s.id}`}
                    className="flex flex-wrap items-start gap-x-3 gap-y-2 py-2 border-t border-white/5 font-mono text-xs"
                  >
                    <span
                      aria-hidden="true"
                      className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                        s.done
                          ? 'border-aether-green/60 bg-aether-green/15 text-aether-green'
                          : 'border-white/20'
                      }`}
                    >
                      {s.done && <Check className="w-3 h-3" />}
                    </span>
                    <div className="min-w-0 flex-1 basis-48">
                      <p className={s.done ? 'text-zinc-300' : 'text-zinc-100'}>{s.title}</p>
                      {s.detail && <p className="text-zinc-500 mt-0.5">{s.detail}</p>}
                      {s.done && (
                        <p className="text-aether-green/90 mt-1">
                          Done by {s.checkedBy ?? 'unknown'} ·{' '}
                          {s.checkedAt ? new Date(s.checkedAt).toLocaleString() : ''}
                          {s.note && <span className="text-zinc-300"> · {s.note}</span>}
                        </p>
                      )}
                    </div>
                    {!s.done && canCheck && list.open && (
                      <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto sm:ml-auto pl-7 sm:pl-0">
                        <input
                          value={notes[s.id] ?? ''}
                          onChange={(e) => setNotes((n) => ({ ...n, [s.id]: e.target.value }))}
                          maxLength={500}
                          placeholder="Note (optional)"
                          aria-label={`Note for ${s.title}`}
                          className={`${control} py-1.5 min-w-0 flex-1 sm:w-44 sm:flex-none`}
                        />
                        <button
                          type="button"
                          disabled={busy !== null}
                          onClick={() => void tick(s.id)}
                          aria-label={`Mark done: ${s.title}`}
                          className={`${button} bg-aether-green/15 hover:bg-aether-green/25 border border-aether-green/40 text-aether-green`}
                        >
                          <Check className="w-3.5 h-3.5" aria-hidden="true" />
                          Done
                        </button>
                      </div>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          );
        })
      )}
      {list && canCheck && list.open && (
        <p className="text-[10px] font-mono text-zinc-500">
          Ticks are permanent and go into the audit log and the run&apos;s evidence report. To
          correct one, add a note on a later step.
        </p>
      )}
    </div>
  );
}

/** Admin editor: whole runbook replaced on save (server keeps step ids and bumps the version). */
function Editor({
  initial,
  onSave,
  onCancel,
}: {
  initial: RunbookStepDraft[];
  onSave: (steps: RunbookStepDraft[]) => Promise<void>;
  onCancel: () => void;
}) {
  const [steps, setSteps] = useState<RunbookStepDraft[]>(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const set = (i: number, patch: Partial<RunbookStepDraft>) =>
    setSteps((all) => all.map((s, j) => (j === i ? { ...s, ...patch } : s)));
  const move = (i: number, by: number) =>
    setSteps((all) => {
      const next = [...all];
      const [s] = next.splice(i, 1);
      next.splice(i + by, 0, s);
      return next;
    });

  const save = async () => {
    setSaving(true);
    try {
      await onSave(steps.map((s) => ({ ...s, detail: s.detail?.trim() ? s.detail : null })));
    } catch (e) {
      setError(errText(e));
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <ol className="flex flex-col gap-3">
        {steps.map((s, i) => (
          <li
            key={s.id ?? `new-${i}`}
            className="rounded-xl border border-white/10 bg-white/[0.02] p-3 flex flex-col gap-2"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-mono text-zinc-500 w-5">{i + 1}.</span>
              <select
                value={s.phase}
                onChange={(e) => set(i, { phase: e.target.value as RunbookPhase })}
                aria-label={`Phase of step ${i + 1}`}
                className={control}
              >
                {PHASES.map((p) => (
                  <option key={p} value={p}>
                    {PHASE_LABEL[p]}
                  </option>
                ))}
              </select>
              <div className="ml-auto flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => move(i, -1)}
                  disabled={i === 0}
                  aria-label={`Move step ${i + 1} up`}
                  className={`${button} px-2 bg-white/[0.04] hover:bg-white/[0.1] text-zinc-300`}
                >
                  <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => move(i, 1)}
                  disabled={i === steps.length - 1}
                  aria-label={`Move step ${i + 1} down`}
                  className={`${button} px-2 bg-white/[0.04] hover:bg-white/[0.1] text-zinc-300`}
                >
                  <ArrowDown className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => setSteps((all) => all.filter((_, j) => j !== i))}
                  aria-label={`Remove step ${i + 1}`}
                  className={`${button} px-2 bg-white/[0.04] hover:bg-aether-red/20 text-zinc-300 hover:text-red-200`}
                >
                  <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>
            <input
              value={s.title}
              onChange={(e) => set(i, { title: e.target.value })}
              maxLength={120}
              placeholder="What to do"
              aria-label={`Title of step ${i + 1}`}
              className={`${control} w-full`}
            />
            <textarea
              value={s.detail ?? ''}
              onChange={(e) => set(i, { detail: e.target.value })}
              maxLength={1000}
              rows={2}
              placeholder="How, who, where (optional)"
              aria-label={`Detail of step ${i + 1}`}
              className={`${control} w-full resize-y`}
            />
          </li>
        ))}
      </ol>
      {error && (
        <p role="alert" className="text-[11px] font-mono text-red-300">
          {error}
        </p>
      )}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() =>
            setSteps((all) => [
              ...all,
              { phase: all[all.length - 1]?.phase ?? 'before', title: '', detail: null },
            ])
          }
          disabled={steps.length >= 50}
          className={`${button} bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-zinc-200`}
        >
          <Plus className="w-3.5 h-3.5" aria-hidden="true" />
          Add step
        </button>
        <button
          type="button"
          onClick={() => void save()}
          disabled={saving || steps.some((s) => !s.title.trim())}
          className={`${button} bg-aether-cyan/15 hover:bg-aether-cyan/25 border border-aether-cyan/40 text-aether-cyan`}
        >
          {saving ? 'Saving…' : 'Save runbook'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className={`${button} ml-auto bg-white/[0.03] hover:bg-white/[0.08] text-zinc-400`}
        >
          Cancel
        </button>
      </div>
      <p className="text-[10px] font-mono text-zinc-500">
        Changes apply to drills and failovers started after saving. Each run keeps the version it
        started with.
      </p>
    </div>
  );
}

/** DR runbook: the organization's recovery steps, and a per-run checklist. */
export default function RunbookPanel({
  runbooks,
  drills,
  myRole,
  refreshKey,
}: {
  runbooks: RunbooksCapability;
  drills?: DrillsCapability;
  myRole: MemberRole;
  refreshKey: number | string;
}) {
  const isAdmin = myRole === 'admin';
  const canCheck = myRole !== 'viewer';
  const [book, setBook] = useState<Runbook | null | undefined>(undefined);
  const [runs, setRuns] = useState<RunSummary[] | null>(null);
  const [editing, setEditing] = useState<RunbookStepDraft[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const [b, r] = await Promise.all([runbooks.get(), drills ? drills.listRuns() : []]);
      setBook(b);
      setRuns(r.slice(0, 20));
      setError(null);
    } catch (e) {
      setError(errText(e));
    }
  }, [runbooks, drills]);

  useEffect(() => {
    void load();
  }, [load, refreshKey]);

  return (
    <section
      aria-labelledby="runbook-title"
      className="w-full rounded-[2rem] border border-white/10 bg-aether-panel/40 backdrop-blur-3xl p-4 sm:p-6 flex flex-col gap-5"
    >
      <div>
        <h2 id="runbook-title" className="text-sm font-mono uppercase tracking-widest text-white">
          DR runbook
        </h2>
        <p className="text-[11px] font-mono text-zinc-400 mt-1 max-w-2xl">
          The steps your team follows to recover. Every drill and failover gets its own copy to tick
          off, and the evidence report shows who did each step and when.
        </p>
      </div>
      {error && (
        <p role="alert" className="text-[11px] font-mono text-red-300">
          {error}
        </p>
      )}

      {book && runs && (
        <div className="rounded-2xl border border-white/10 p-4">
          <h3 className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono mb-3">
            Checklist
          </h3>
          <Checklist runbooks={runbooks} runs={runs} canCheck={canCheck} refreshKey={refreshKey} />
        </div>
      )}

      <div className="rounded-2xl border border-white/10 p-4">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <h3 className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono">Runbook</h3>
          {book && (
            <span className="text-[10px] font-mono text-zinc-500">
              v{book.version} · updated {new Date(book.updatedAt).toLocaleString()}
              {book.updatedBy ? ` by ${book.updatedBy}` : ''}
            </span>
          )}
          {isAdmin && book && !editing && (
            <button
              type="button"
              onClick={() => setEditing(book.steps)}
              className={`${button} ml-auto bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-zinc-200`}
            >
              Edit runbook
            </button>
          )}
        </div>

        {editing ? (
          <Editor
            initial={editing}
            onCancel={() => setEditing(null)}
            onSave={async (steps) => {
              await runbooks.save(steps);
              setEditing(null);
              await load();
            }}
          />
        ) : book === undefined ? (
          <p className="text-[11px] font-mono text-zinc-500">Loading runbook…</p>
        ) : book === null || book.steps.length === 0 ? (
          <div className="flex flex-col gap-3">
            <p className="text-[11px] font-mono text-zinc-400">
              {isAdmin
                ? 'No runbook yet. Start from a template for AWS Elastic Disaster Recovery and make it yours: name the people, systems and access paths your team uses.'
                : 'No runbook yet. An admin can create one.'}
            </p>
            {isAdmin && (
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setEditing(STARTER_RUNBOOK)}
                  className={`${button} bg-aether-cyan/15 hover:bg-aether-cyan/25 border border-aether-cyan/40 text-aether-cyan`}
                >
                  Start from template
                </button>
                <button
                  type="button"
                  onClick={() => setEditing([{ phase: 'before', title: '', detail: null }])}
                  className={`${button} bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-zinc-200`}
                >
                  Start blank
                </button>
              </div>
            )}
          </div>
        ) : (
          PHASES.map((phase) => {
            const steps = book.steps.filter((s) => s.phase === phase);
            if (!steps.length) return null;
            return (
              <div key={phase} className="mb-3 last:mb-0">
                <h4 className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono mb-1">
                  {PHASE_LABEL[phase]}
                </h4>
                <ol className="flex flex-col">
                  {steps.map((s) => (
                    <li key={s.id} className="py-1.5 border-t border-white/5 font-mono text-xs">
                      <p className="text-zinc-200">{s.title}</p>
                      {s.detail && <p className="text-zinc-500 mt-0.5">{s.detail}</p>}
                    </li>
                  ))}
                </ol>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
