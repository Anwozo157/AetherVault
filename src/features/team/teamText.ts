// Plain-language text for team management.
import type { MemberRole } from '../../domain/dr';

export const ROLES: readonly MemberRole[] = ['viewer', 'operator', 'approver', 'admin'];

export const ROLE_HELP: Record<MemberRole, string> = {
  viewer: 'Watches runs and the audit log. Cannot change anything.',
  operator: 'Requests, aborts and resets failovers.',
  approver: "Approves someone else's failover request (and can do everything an operator can).",
  admin: 'Manages the team, plus everything an approver can do.',
};

/** Message the admin sends to the invitee (until invite emails are automated). */
export function inviteMessage(
  orgName: string,
  email: string,
  role: MemberRole,
  consoleUrl: string,
) {
  return (
    `You've been invited to join ${orgName} on AetherVault as ${role}.\n` +
    `Sign in with ${email} at ${consoleUrl} using "Email me a sign-in link". ` +
    `You'll be added automatically.`
  );
}

export function consoleUrl(loc: Pick<Location, 'origin' | 'pathname'> = window.location) {
  return `${loc.origin}${loc.pathname}#/console`;
}
