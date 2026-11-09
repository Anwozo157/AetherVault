import { Copy, Check, UserPlus, X } from 'lucide-react';
import { useCallback, useEffect, useState, type FormEvent } from 'react';
import type { MemberRole, TeamCapability, TeamInvite, TeamMember } from '../../domain/dr';
import { ROLES, ROLE_HELP, consoleUrl, inviteMessage } from './teamText';

const errText = (e: unknown) => (e instanceof Error ? e.message : String(e));

export default function TeamPanel({
  team,
  refreshKey,
}: {
  team: TeamCapability;
  refreshKey: number | string;
}) {
  const isAdmin = team.myRole === 'admin';
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [invites, setInvites] = useState<TeamInvite[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<MemberRole>('approver');
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState<{ email: string; role: MemberRole } | null>(null);
  const [copied, setCopied] = useState(false);
  const [confirmRemove, setConfirmRemove] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setMembers(await team.listMembers());
      setInvites(isAdmin ? await team.listInvites() : []);
    } catch (e) {
      setError(errText(e));
    }
  }, [team, isAdmin]);

  useEffect(() => {
    void load();
  }, [load, refreshKey]);

  const run = async (action: () => Promise<void>) => {
    setBusy(true);
    setError(null);
    try {
      await action();
      await load();
    } catch (e) {
      setError(errText(e));
    } finally {
      setBusy(false);
    }
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const target = email.trim().toLowerCase();
    void run(async () => {
      await team.invite(target, role);
      setSent({ email: target, role });
      setCopied(false);
      setEmail('');
    });
  };

  const message = sent ? inviteMessage(team.orgName, sent.email, sent.role, consoleUrl()) : '';
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const control =
    'bg-aether-panel border border-white/10 rounded-lg px-2.5 py-2 text-zinc-200 font-mono text-xs focus:outline-none focus:border-aether-cyan/50';

  return (
    <section
      aria-labelledby="team-title"
      className="w-full rounded-[2rem] border border-white/10 bg-aether-panel/40 backdrop-blur-3xl p-4 sm:p-6 flex flex-col gap-5"
    >
      <div>
        <h2 id="team-title" className="text-sm font-mono uppercase tracking-widest text-white">
          Team · {team.orgName}
        </h2>
        <p className="text-[11px] font-mono text-zinc-400 mt-1 max-w-xl">
          Failovers need two people: an operator to request and a different approver to approve.
        </p>
      </div>

      {isAdmin && (
        <form onSubmit={submit} aria-label="Invite a teammate" className="flex flex-col gap-2">
          <div className="flex flex-wrap gap-2">
            <input
              type="email"
              required
              aria-label="Teammate email"
              placeholder="teammate@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`${control} w-full sm:w-72`}
            />
            <select
              aria-label="Role"
              value={role}
              onChange={(e) => setRole(e.target.value as MemberRole)}
              className={`${control} w-full sm:w-auto`}
            >
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            <button
              type="submit"
              disabled={busy}
              className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-aether-cyan/15 hover:bg-aether-cyan/25 border border-aether-cyan/40 text-xs font-mono text-aether-cyan hover:text-white transition-colors disabled:opacity-50 w-full sm:w-auto"
            >
              <UserPlus className="w-4 h-4" aria-hidden="true" />
              Invite
            </button>
          </div>
          <p className="text-[11px] font-mono text-zinc-500">{ROLE_HELP[role]}</p>
        </form>
      )}

      {sent && (
        <div
          role="status"
          className="min-w-0 rounded-xl border border-aether-green/30 bg-aether-green/5 p-3 flex flex-col gap-2"
        >
          <p className="text-xs font-mono text-aether-green">
            Invited {sent.email} as {sent.role}. Send them this message:
          </p>
          <pre className="whitespace-pre-wrap [overflow-wrap:anywhere] min-w-0 text-[11px] font-mono text-zinc-300 bg-black/30 rounded-lg p-2">
            {message}
          </pre>
          <button
            type="button"
            onClick={() => void copy()}
            className="self-start flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-[11px] font-mono text-zinc-200"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy message'}
          </button>
        </div>
      )}

      {error && (
        <p role="alert" className="text-xs font-mono text-red-300">
          {error}
        </p>
      )}

      <div className="relative overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full min-w-[520px] text-left text-xs font-mono">
          <caption className="sr-only">Members of {team.orgName}</caption>
          <thead className="text-[10px] uppercase tracking-widest text-zinc-500 bg-white/[0.02]">
            <tr>
              <th scope="col" className="px-3 py-2">
                Member
              </th>
              <th scope="col" className="px-3 py-2">
                Role
              </th>
              <th scope="col" className="px-3 py-2">
                Joined
              </th>
              {isAdmin && (
                <th scope="col" className="px-3 py-2">
                  <span className="sr-only">Actions</span>
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {members.map((m) => (
              <tr key={m.userId} className="border-t border-white/5 text-zinc-300">
                <td className="px-3 py-2">
                  {m.email}
                  {m.isMe && <span className="text-zinc-500"> (you)</span>}
                </td>
                <td className="px-3 py-2">
                  {isAdmin && !m.isMe ? (
                    <select
                      aria-label={`Role for ${m.email}`}
                      value={m.role}
                      disabled={busy}
                      onChange={(e) =>
                        void run(() => team.setRole(m.userId, e.target.value as MemberRole))
                      }
                      className={control}
                    >
                      {ROLES.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  ) : (
                    m.role
                  )}
                </td>
                <td className="px-3 py-2 text-zinc-500 whitespace-nowrap">
                  {new Date(m.joinedAt).toLocaleDateString()}
                </td>
                {isAdmin && (
                  <td className="px-3 py-2 text-right whitespace-nowrap">
                    {!m.isMe &&
                      (confirmRemove === m.userId ? (
                        <span className="inline-flex gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setConfirmRemove(null);
                              void run(() => team.remove(m.userId));
                            }}
                            className="text-red-300 hover:text-white underline"
                          >
                            Confirm remove
                          </button>
                          <button
                            type="button"
                            onClick={() => setConfirmRemove(null)}
                            className="text-zinc-400 hover:text-white underline"
                          >
                            Keep
                          </button>
                        </span>
                      ) : (
                        <button
                          type="button"
                          aria-label={`Remove ${m.email}`}
                          onClick={() => setConfirmRemove(m.userId)}
                          className="p-1 rounded-lg text-zinc-500 hover:text-red-300 hover:bg-white/[0.05]"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      ))}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isAdmin && invites.length > 0 && (
        <div className="flex flex-col gap-2">
          <h3 className="text-[11px] font-mono uppercase tracking-widest text-zinc-400">
            Pending invites
          </h3>
          <ul className="flex flex-col gap-1">
            {invites.map((i) => (
              <li
                key={i.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-white/5 px-3 py-2 text-xs font-mono text-zinc-300"
              >
                <span>
                  {i.email} · {i.role}
                  <span className="text-zinc-500">
                    {' '}
                    · invited by {i.invitedByEmail ?? 'unknown'}
                  </span>
                </span>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => void run(() => team.revokeInvite(i.id))}
                  className="text-zinc-400 hover:text-red-300 underline"
                >
                  Revoke
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
