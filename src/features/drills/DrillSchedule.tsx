import { CalendarClock, Play } from 'lucide-react';
import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { TARGET_REGIONS } from '../../config/regions';
import type {
  DrillCadence,
  DrillSchedule as Schedule,
  DrillsCapability,
  MemberRole,
} from '../../domain/dr';

const errText = (e: unknown) => (e instanceof Error ? e.message : String(e));

export const CADENCE_LABEL: Record<DrillCadence, string> = {
  weekly: 'Weekly',
  monthly: 'Monthly',
  quarterly: 'Quarterly',
};

/** A schedule more than this far past due means the scheduler is not running. */
const OVERDUE_MS = 3 * 60_000;

/** Value for <input type="datetime-local">, in local time. */
export function toLocalInput(d: Date): string {
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`;
}

/** Tomorrow at 09:00 local time: a sensible first drill. */
export function defaultFirstRun(now = new Date()): string {
  const d = new Date(now);
  d.setDate(d.getDate() + 1);
  d.setHours(9, 0, 0, 0);
  return toLocalInput(d);
}

/** "in 3 days", "in 5 hours", "in 12 min", or "now". */
export function relativeTime(iso: string, now = Date.now()): string {
  const ms = new Date(iso).getTime() - now;
  if (ms <= 60_000) return 'now';
  const min = Math.round(ms / 60_000);
  if (min < 90) return `in ${min} min`;
  const h = Math.round(min / 60);
  if (h < 36) return `in ${h} hours`;
  return `in ${Math.round(h / 24)} days`;
}

const regionLabel = (id: string) => TARGET_REGIONS.find((r) => r.id === id)?.label ?? id;

export default function DrillSchedule({
  drills,
  myRole,
  refreshKey,
  onChanged,
}: {
  drills: DrillsCapability;
  myRole: MemberRole;
  refreshKey: number | string;
  onChanged: () => void;
}) {
  const isAdmin = myRole === 'admin';
  const canRun = myRole !== 'viewer';
  const [schedule, setSchedule] = useState<Schedule | null | undefined>(undefined);
  const [cadence, setCadence] = useState<DrillCadence>('monthly');
  const [firstRun, setFirstRun] = useState(defaultFirstRun);
  const [target, setTarget] = useState('aws-us-west-2');
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const s = await drills.getSchedule();
      setSchedule(s);
      if (s) {
        setCadence(s.cadence);
        setTarget(s.targetRegion);
      }
    } catch (e) {
      setError(errText(e));
    }
  }, [drills]);

  useEffect(() => {
    void load();
  }, [load, refreshKey]);

  const act = async (fn: () => Promise<string>) => {
    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      setNotice(await fn());
      await load();
      onChanged();
    } catch (e) {
      setError(errText(e));
    } finally {
      setBusy(false);
    }
  };

  const save = (e: FormEvent) => {
    e.preventDefault();
    void act(async () => {
      const next = await drills.setSchedule({
        cadence,
        firstRunAt: new Date(firstRun).toISOString(),
        targetRegion: target,
      });
      return `Scheduled. Next drill ${new Date(next).toLocaleString()}.`;
    });
  };

  const runNow = () =>
    void act(async () => {
      await drills.startDrill(target);
      // The list derives the result from timestamps; refresh once the drill has finished.
      window.setTimeout(onChanged, 6500);
      return 'Drill started in an isolated network. The result appears in a few seconds.';
    });

  const active = schedule?.enabled ? schedule : null;
  const overdue = active && Date.now() - new Date(active.nextRunAt).getTime() > OVERDUE_MS;
  const control =
    'bg-aether-panel border border-white/10 rounded-lg px-2.5 py-2 text-zinc-200 font-mono text-xs focus:outline-none focus:border-aether-cyan/50 disabled:opacity-60';

  return (
    <form
      onSubmit={save}
      aria-label="Drill schedule"
      className="flex flex-col gap-3 rounded-xl border border-white/10 p-3"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-2 min-w-0">
          <CalendarClock className="w-4 h-4 mt-0.5 text-aether-cyan shrink-0" aria-hidden="true" />
          <div className="min-w-0">
            <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
              Scheduled drills
            </p>
            <p className="text-xs font-mono text-zinc-200 mt-1" data-testid="schedule-status">
              {schedule === undefined
                ? 'Loading schedule…'
                : active
                  ? `${CADENCE_LABEL[active.cadence]} to ${regionLabel(active.targetRegion)}. Next drill ${new Date(active.nextRunAt).toLocaleString()} (${relativeTime(active.nextRunAt)}).`
                  : 'No drills scheduled.'}
            </p>
            {overdue && (
              <p className="text-[11px] font-mono text-aether-amber mt-1">
                Overdue: the scheduler checks every minute, so it may not be running on this server.
              </p>
            )}
            {active?.lastRunAt && (
              <p className="text-[11px] font-mono text-zinc-500 mt-1">
                Last scheduled drill {new Date(active.lastRunAt).toLocaleString()}.
              </p>
            )}
          </div>
        </div>
        {canRun && (
          <button
            type="button"
            onClick={runNow}
            disabled={busy}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-aether-green/10 hover:bg-aether-green/20 border border-aether-green/40 text-xs font-mono text-aether-green hover:text-white disabled:opacity-60"
          >
            <Play className="w-3.5 h-3.5" aria-hidden="true" />
            Run drill now
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <label className="flex flex-col gap-1 text-[10px] font-mono uppercase tracking-widest text-zinc-500">
          Recovery region
          <select
            value={target}
            disabled={!canRun || busy}
            onChange={(e) => setTarget(e.target.value)}
            className={control}
          >
            {TARGET_REGIONS.map((r) => (
              <option key={r.id} value={r.id}>
                {r.label}
              </option>
            ))}
          </select>
        </label>
        {isAdmin && (
          <>
            <label className="flex flex-col gap-1 text-[10px] font-mono uppercase tracking-widest text-zinc-500">
              Repeat
              <select
                value={cadence}
                disabled={busy}
                onChange={(e) => setCadence(e.target.value as DrillCadence)}
                className={control}
              >
                {(Object.keys(CADENCE_LABEL) as DrillCadence[]).map((c) => (
                  <option key={c} value={c}>
                    {CADENCE_LABEL[c]}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1 text-[10px] font-mono uppercase tracking-widest text-zinc-500">
              First drill
              <input
                type="datetime-local"
                required
                value={firstRun}
                disabled={busy}
                onChange={(e) => setFirstRun(e.target.value)}
                className={control}
              />
            </label>
            <button
              type="submit"
              disabled={busy}
              className="px-4 py-2 rounded-xl bg-aether-cyan/15 hover:bg-aether-cyan/25 border border-aether-cyan/40 text-xs font-mono text-aether-cyan hover:text-white disabled:opacity-60"
            >
              {active ? 'Update schedule' : 'Save schedule'}
            </button>
            {active && (
              <button
                type="button"
                disabled={busy}
                onClick={() =>
                  void act(async () => {
                    await drills.disableSchedule();
                    return 'Scheduled drills turned off.';
                  })
                }
                className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-xs font-mono text-zinc-300"
              >
                Turn off
              </button>
            )}
          </>
        )}
      </div>

      <p className="text-[11px] font-mono text-zinc-500">
        Drills launch recovery in an isolated network and never cut production over, so they run
        without a second approver. Every drill is audited and gets an evidence report.
        {!isAdmin && ' Only admins change the schedule.'}
      </p>
      {notice && (
        <p role="status" className="text-[11px] font-mono text-aether-green">
          {notice}
        </p>
      )}
      {error && (
        <p role="alert" className="text-xs font-mono text-red-300">
          {error}
        </p>
      )}
    </form>
  );
}
