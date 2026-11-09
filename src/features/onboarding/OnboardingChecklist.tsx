import { CheckCircle2, Circle, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { AuditCapability, TeamCapability } from '../../domain/dr';
import type { CommandTab } from '../failover/ControlBar';
import { readFlag, setFlag } from './progress';

interface Step {
  id: string;
  title: string;
  hint: string;
  done: boolean;
  action?: { label: string; tab: CommandTab };
}

/** First-run checklist for organization admins, computed from real data. */
export default function OnboardingChecklist({
  orgId,
  team,
  audit,
  refreshKey,
  onGoTo,
}: {
  orgId: string;
  team: TeamCapability;
  audit: AuditCapability;
  refreshKey: number | string;
  onGoTo: (tab: CommandTab) => void;
}) {
  const [dismissed, setDismissed] = useState(() => readFlag('dismissed', orgId));
  const [hasApprover, setHasApprover] = useState(false);
  const [hasDrill, setHasDrill] = useState(false);
  const verified = readFlag('verified', orgId);

  useEffect(() => {
    if (dismissed) return;
    let cancelled = false;
    void (async () => {
      try {
        const [members, invites, log] = await Promise.all([
          team.listMembers(),
          team.listInvites(),
          audit.list({ limit: 200 }),
        ]);
        if (cancelled) return;
        const approverRole = (r: string) => r === 'approver' || r === 'admin';
        setHasApprover(
          members.some((m) => !m.isMe && approverRole(m.role)) ||
            invites.some((i) => approverRole(i.role)),
        );
        setHasDrill(log.some((e) => e.action === 'failover.approved'));
      } catch {
        // The checklist is optional; failures leave steps open.
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [team, audit, refreshKey, dismissed]);

  if (dismissed) return null;

  const steps: Step[] = [
    { id: 'org', title: 'Create your organization', hint: team.orgName, done: true },
    {
      id: 'approver',
      title: 'Invite an approver',
      hint: 'Failovers need a second person to approve them.',
      done: hasApprover,
      action: { label: 'Open Team', tab: 'team' },
    },
    {
      id: 'drill',
      title: 'Run a first failover drill',
      hint: 'Hold 1-Click Failover; your approver approves it in their own browser.',
      done: hasDrill,
      action: { label: 'Go to Mission Control', tab: 'hud' },
    },
    {
      id: 'verify',
      title: 'Verify your audit chain',
      hint: 'Proves no entry was changed after it was written.',
      done: verified,
      action: { label: 'Open Audit Log', tab: 'audit' },
    },
  ];
  const doneCount = steps.filter((s) => s.done).length;

  return (
    <section
      aria-labelledby="onboarding-title"
      className="w-full mb-4 rounded-2xl border border-aether-cyan/20 bg-aether-cyan/[0.04] p-4"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2
            id="onboarding-title"
            className="text-xs font-mono uppercase tracking-widest text-white"
          >
            Get set up · {doneCount} of {steps.length}
          </h2>
          <div
            className="mt-2 h-1 w-48 max-w-full rounded-full bg-white/10 overflow-hidden"
            role="progressbar"
            aria-label="Setup progress"
            aria-valuemin={0}
            aria-valuemax={steps.length}
            aria-valuenow={doneCount}
          >
            <div
              className="h-full bg-aether-cyan"
              style={{ width: `${(doneCount / steps.length) * 100}%` }}
            />
          </div>
        </div>
        <button
          type="button"
          aria-label="Hide setup checklist"
          onClick={() => {
            setFlag('dismissed', orgId);
            setDismissed(true);
          }}
          className="p-1 rounded-lg text-zinc-500 hover:text-white hover:bg-white/[0.05]"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <ol className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
        {steps.map((s) => (
          <li
            key={s.id}
            className="flex items-start gap-2 rounded-xl border border-white/5 bg-black/20 p-3"
          >
            {s.done ? (
              <CheckCircle2
                className="w-4 h-4 mt-0.5 shrink-0 text-aether-green"
                aria-hidden="true"
              />
            ) : (
              <Circle className="w-4 h-4 mt-0.5 shrink-0 text-zinc-500" aria-hidden="true" />
            )}
            <div className="min-w-0">
              <p className={`text-xs font-mono ${s.done ? 'text-zinc-400' : 'text-white'}`}>
                <span className="sr-only">{s.done ? 'Done: ' : 'To do: '}</span>
                {s.title}
              </p>
              <p className="text-[11px] font-mono text-zinc-500">{s.hint}</p>
              {!s.done && s.action && (
                <button
                  type="button"
                  onClick={() => onGoTo(s.action!.tab)}
                  className="mt-1 text-[11px] font-mono text-aether-cyan hover:text-white underline"
                >
                  {s.action.label}
                </button>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
