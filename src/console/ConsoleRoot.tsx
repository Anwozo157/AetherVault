// Composition root for the signed-in console (loaded lazily on #/console).
// Like main.tsx, this is the one place allowed to construct a concrete provider.

import { createClient, type Session, type SupabaseClient } from '@supabase/supabase-js';
import { useCallback, useEffect, useState, type FormEvent, type ReactNode } from 'react';
import App from '../App';
import { SUPABASE_ANON_KEY, SUPABASE_URL, hasBackend, isLocalBackend } from '../config/backend';
import SignInForm from '../features/console/SignInForm';
import { DrProviderRoot } from '../providers/DrProviderContext';
import { SupabaseDrProvider } from '../providers/supabase/SupabaseDrProvider';
import {
  createOrg,
  createSupabaseConsoleApi,
  listMemberships,
  type Membership,
} from '../providers/supabase/consoleApi';

const DEMO_ACCOUNTS = [
  'operator@aethervault.local',
  'approver@aethervault.local',
  'viewer@aethervault.local',
  'admin@aethervault.local',
] as const;

let client: SupabaseClient | null = null;
function getClient() {
  client ??= createClient(SUPABASE_URL, SUPABASE_ANON_KEY, { auth: { flowType: 'pkce' } });
  return client;
}

function Screen({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-aether-ink text-white flex flex-col items-center justify-center p-4 font-sans">
      {children}
    </div>
  );
}

function Message({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <Screen>
      <div className="max-w-md text-center">
        <h1 className="text-lg font-bold">{title}</h1>
        <div className="mt-2 text-xs font-mono text-zinc-400">{children}</div>
        <a
          href="#/"
          className="inline-block mt-5 text-xs font-mono text-aether-cyan hover:text-white"
        >
          ← Back to the simulated demo
        </a>
      </div>
    </Screen>
  );
}

function CreateOrg({ onCreate }: { onCreate: (name: string) => Promise<void> }) {
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    onCreate(name.trim()).catch((err: unknown) =>
      setError(err instanceof Error ? err.message : String(err)),
    );
  };
  return (
    <Screen>
      <form onSubmit={submit} className="w-full max-w-sm text-center">
        <h1 className="text-lg font-bold">You are not in an organization yet</h1>
        <p className="mt-2 text-xs font-mono text-zinc-400">
          Ask an admin to add you, or create one (you become its admin).
        </p>
        <input
          aria-label="Organization name"
          required
          maxLength={100}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mt-4 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-sm font-mono"
          placeholder="Organization name"
        />
        <button
          type="submit"
          className="w-full mt-3 px-4 py-2.5 rounded-xl bg-aether-cyan/15 border border-aether-cyan/40 text-xs font-mono uppercase tracking-widest text-aether-cyan"
        >
          Create organization
        </button>
        {error && (
          <p role="alert" className="mt-3 text-xs font-mono text-red-300">
            {error}
          </p>
        )}
      </form>
    </Screen>
  );
}

function Console({ session }: { session: Session }) {
  const supabase = getClient();
  const [memberships, setMemberships] = useState<Membership[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [provider, setProvider] = useState<SupabaseDrProvider | null>(null);
  const userId = session.user.id;

  const load = useCallback(() => {
    listMemberships(supabase, userId)
      .then(setMemberships)
      .catch((e: unknown) => setError(e instanceof Error ? e.message : String(e)));
  }, [supabase, userId]);

  useEffect(load, [load]);

  const active = memberships?.[0];
  useEffect(() => {
    if (!active) return;
    const p = new SupabaseDrProvider(createSupabaseConsoleApi(supabase), {
      orgId: active.orgId,
      orgName: active.orgName,
      userId,
      role: active.role,
    });
    setProvider(p);
    return () => {
      p.dispose();
      setProvider(null);
    };
  }, [supabase, userId, active]);

  if (error) return <Message title="Could not load your organizations">{error}</Message>;
  if (!memberships) return <Message title="Loading your organization…" />;
  if (!active)
    return (
      <CreateOrg
        onCreate={async (name) => {
          await createOrg(supabase, name);
          load();
        }}
      />
    );
  if (!provider) return <Message title="Connecting…" />;

  return (
    <DrProviderRoot provider={provider}>
      <App
        session={{
          orgName: active.orgName,
          role: active.role,
          email: session.user.email ?? '',
          onSignOut: () => void supabase.auth.signOut(),
        }}
      />
    </DrProviderRoot>
  );
}

export default function ConsoleRoot() {
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  useEffect(() => {
    if (!hasBackend) return;
    const supabase = getClient();
    void supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_event, next) => setSession(next));
    return () => data.subscription.unsubscribe();
  }, []);

  if (!hasBackend)
    return (
      <Message title="Live console not available on this deployment">
        This public site runs the simulated demo only. The signed-in console (real approvals and
        audit log) runs against a Supabase backend; see docs/PHASE_3_PLAN.md.
      </Message>
    );
  if (session === undefined) return <Message title="Checking sign-in…" />;
  if (!session) {
    const supabase = getClient();
    return (
      <Screen>
        <SignInForm
          demoAccounts={isLocalBackend ? DEMO_ACCOUNTS : undefined}
          onPasswordSignIn={async (email, password) => {
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) throw new Error(error.message);
          }}
          onMagicLink={async (email) => {
            const { error } = await supabase.auth.signInWithOtp({
              email,
              options: {
                shouldCreateUser: true,
                emailRedirectTo: `${window.location.origin}${window.location.pathname}?console`,
              },
            });
            if (error) throw new Error(error.message);
          }}
        />
      </Screen>
    );
  }
  return <Console session={session} />;
}
