import { KeyRound, Mail } from 'lucide-react';
import { useState, type FormEvent } from 'react';

export interface SignInFormProps {
  /**
   * Password sign-in. Passed only for the local Docker database (seeded demo accounts);
   * hosted deployments use magic links only, per ADR 0002.
   */
  onPasswordSignIn?: (email: string, password: string) => Promise<void>;
  onMagicLink: (email: string) => Promise<void>;
  /** Seeded local accounts to show as a hint (local Docker database only). */
  demoAccounts?: readonly string[];
  /** Where sign-in emails actually land (local mode: the Mailpit inbox, not real email). */
  localInboxUrl?: string;
}

export default function SignInForm({
  onPasswordSignIn,
  onMagicLink,
  demoAccounts,
  localInboxUrl,
}: SignInFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const run = async (action: () => Promise<void>) => {
    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      await action();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (onPasswordSignIn) void run(() => onPasswordSignIn(email.trim(), password));
    else sendLink();
  };

  const sendLink = () => {
    if (!email.trim()) {
      setError('Enter your email first.');
      return;
    }
    void run(async () => {
      await onMagicLink(email.trim());
      setNotice(
        localInboxUrl
          ? `Local mode: no real email is sent. Open the local inbox at ${localInboxUrl} and click the link for ${email.trim()}.`
          : `Sign-in link sent to ${email.trim()}.`,
      );
    });
  };

  const input =
    'w-full mt-1 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 focus:border-aether-cyan/60 outline-none text-sm font-mono text-white placeholder:text-zinc-600';

  return (
    <form
      onSubmit={submit}
      aria-label="Sign in"
      className="w-full max-w-sm p-6 rounded-[2rem] border border-white/10 bg-aether-panel/60 backdrop-blur-3xl shadow-2xl"
    >
      <h1 className="text-lg font-bold tracking-tight text-white">Sign in to the live console</h1>
      <p className="text-xs font-mono text-zinc-400 mt-1">
        Failovers require a second person&apos;s approval. Every action is audited.
      </p>

      <label className="block mt-5 text-[11px] font-mono uppercase tracking-wider text-zinc-400">
        Email
        <input
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={input}
          placeholder="you@company.com"
        />
      </label>
      {onPasswordSignIn && (
        <>
          <label className="block mt-3 text-[11px] font-mono uppercase tracking-wider text-zinc-400">
            Password
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={input}
            />
          </label>

          <button
            type="submit"
            disabled={busy || !password}
            className="w-full mt-5 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-aether-cyan/15 hover:bg-aether-cyan/25 border border-aether-cyan/40 text-xs font-mono tracking-widest uppercase text-aether-cyan hover:text-white transition-colors disabled:opacity-50"
          >
            <KeyRound className="w-4 h-4" aria-hidden="true" />
            Sign in
          </button>
        </>
      )}
      <button
        type={onPasswordSignIn ? 'button' : 'submit'}
        onClick={onPasswordSignIn ? sendLink : undefined}
        disabled={busy}
        className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-xs font-mono tracking-widest uppercase text-zinc-300 hover:text-white transition-colors disabled:opacity-50"
      >
        <Mail className="w-4 h-4" aria-hidden="true" />
        Email me a sign-in link
      </button>

      {error && (
        <p role="alert" className="mt-3 text-xs font-mono text-red-300">
          {error}
        </p>
      )}
      {notice && (
        <p role="status" className="mt-3 text-xs font-mono text-aether-green">
          {notice}
        </p>
      )}

      {demoAccounts && demoAccounts.length > 0 && (
        <div className="mt-5 pt-4 border-t border-white/5 text-[11px] font-mono text-zinc-500">
          <p className="text-zinc-400">Local demo accounts (password: aether-demo-local)</p>
          <ul className="mt-1 space-y-0.5">
            {demoAccounts.map((a) => (
              <li key={a}>
                <button
                  type="button"
                  className="hover:text-aether-cyan"
                  onClick={() => {
                    setEmail(a);
                    setPassword('aether-demo-local');
                  }}
                >
                  {a}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <a
        href="#/demo"
        className="block mt-5 text-center text-[11px] font-mono text-zinc-500 hover:text-white"
      >
        ← Back to the simulated demo
      </a>
    </form>
  );
}
