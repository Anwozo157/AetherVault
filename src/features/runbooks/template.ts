// Starter runbook for AWS Elastic Disaster Recovery. Generic on purpose: every organization
// edits it to name its own people, systems and access paths.
import type { RunbookPhase, RunbookStepDraft } from '../../domain/dr';

export const PHASE_LABEL: Record<RunbookPhase, string> = {
  before: 'Before recovery',
  during: 'During recovery',
  after: 'After recovery',
};

export const PHASES: RunbookPhase[] = ['before', 'during', 'after'];

export const STARTER_RUNBOOK: RunbookStepDraft[] = [
  {
    phase: 'before',
    title: 'Declare the incident and name an incident lead',
    detail:
      'Confirm the primary site is unavailable (or that this is a planned drill) and record who leads the recovery.',
  },
  {
    phase: 'before',
    title: 'Notify stakeholders',
    detail:
      'Post in the incident channel. Tell support and field teams that recovery is starting and when to expect an update.',
  },
  {
    phase: 'before',
    title: 'Check replication health',
    detail:
      'AWS DRS tab: every server replicating, worst lag within the data-loss target. Note the lag in this step.',
  },
  {
    phase: 'during',
    title: 'Launch recovery',
    detail:
      'Drill: Run drill now (isolated, no production change). Failover: request it, then a second person approves.',
  },
  {
    phase: 'during',
    title: 'Confirm recovery instances are running',
    detail: 'Every protected server has a running recovery instance in the recovery region.',
  },
  {
    phase: 'during',
    title: 'Move users and traffic to the recovery site',
    detail:
      'DNS, VPN or remote-access changes. Skip for drills: drill instances stay in an isolated network.',
  },
  {
    phase: 'after',
    title: 'Validate applications',
    detail: 'Sign in, run a test transaction and check application logs for errors.',
  },
  {
    phase: 'after',
    title: 'Confirm remote access works',
    detail: 'Engineers can reach the recovered servers through their usual remote-access path.',
  },
  {
    phase: 'after',
    title: 'Record the result and open follow-ups',
    detail: 'Note anything that slowed recovery and create tickets to fix it.',
  },
  {
    phase: 'after',
    title: 'Plan failback',
    detail: 'Decide when and how to return to the primary site, and who approves it.',
  },
];
