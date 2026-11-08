import { ShieldAlert, UserCheck } from 'lucide-react';
import { useState } from 'react';
import type { ApprovalCapability, FailoverRun } from '../../domain/dr';

interface ApprovalPanelProps {
  run: FailoverRun;
  approvals: ApprovalCapability;
}

/** Pending two-person approval: who asked, for what, and the actions this user may take. */
export default function ApprovalPanel({ run, approvals }: ApprovalPanelProps) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const act = async (action: () => Promise<void>) => {
    setBusy(true);
    setError(null);
    try {
      await action();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  };

  const canApprove = approvals.canApprove();
  const canCancel = approvals.canRequest();

  return (
    <section
      aria-label="Pending failover approval"
      className="col-span-1 md:col-span-3 mt-4 flex flex-col items-center text-center py-6 border-t border-white/5"
    >
      <div className="w-14 h-14 rounded-full bg-aether-amber/10 border border-aether-amber/30 flex items-center justify-center mb-3">
        <ShieldAlert className="w-7 h-7 text-aether-amber" aria-hidden="true" />
      </div>
      <p className="text-sm font-mono tracking-widest uppercase font-semibold text-aether-amber">
        Awaiting second-person approval
      </p>
      <p className="text-xs font-mono text-zinc-300 mt-2">
        {run.requestedByMe ? 'You' : run.requestedByEmail} requested failover {run.sourceRegion} →{' '}
        {run.targetRegion}
      </p>
      <p className="text-[11px] font-mono text-zinc-500 mt-1">
        {run.requestedByMe
          ? 'An approver or admin other than you must approve before anything changes.'
          : canApprove
            ? 'Review the request. Approving starts the failover immediately.'
            : 'Only an approver or admin can approve this request.'}
      </p>

      <div className="flex flex-wrap justify-center gap-3 mt-5">
        {canApprove && (
          <button
            type="button"
            disabled={busy}
            onClick={() => void act(approvals.approve)}
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-aether-green/10 hover:bg-aether-green/20 border border-aether-green/40 text-xs font-mono tracking-widest uppercase text-aether-green hover:text-white transition-colors disabled:opacity-50"
          >
            <UserCheck className="w-4 h-4" aria-hidden="true" />
            Approve failover
          </button>
        )}
        {canCancel && (
          <button
            type="button"
            disabled={busy}
            onClick={() => void act(approvals.cancel)}
            className="px-5 py-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono tracking-widest uppercase text-zinc-300 hover:text-white transition-colors disabled:opacity-50"
          >
            {run.requestedByMe ? 'Withdraw request' : 'Reject request'}
          </button>
        )}
      </div>
      {error && (
        <p role="alert" className="mt-3 text-xs font-mono text-red-300">
          {error}
        </p>
      )}
    </section>
  );
}
