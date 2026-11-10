import {
  ArrowRight,
  CheckCircle2,
  FileCheck2,
  Fingerprint,
  KeyRound,
  LogIn,
  Mail,
  RefreshCw,
  ScrollText,
  ShieldCheck,
  Users,
  type LucideIcon,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { CONSOLE_HASH, DEMO_HASH } from '../../config/backend';
import { CONTACT_EMAIL, SECURITY_DOC_URL } from '../../config/site';
import HeroMissionControl from './HeroMissionControl';
import ReplicationShowcase from './ReplicationShowcase';

interface LandingPageProps {
  /** Show the console sign-in link (only when a backend is configured). */
  showSignIn?: boolean;
  /** Overridable for tests; defaults to the configured public contact address. */
  contactEmail?: string | null;
}

// Every statement on this page must be true today (AGENTS.md rule 2). Illustrative visuals are
// labeled as such; product facts below are implemented and tested in this repository.

const SPECS = ['SHA-256 audit chain', 'Two-person rule', 'Row-level security', 'No trackers'];

const STACK = [
  'AWS Elastic Disaster Recovery',
  'Terraform',
  'PostgreSQL row-level security',
  'SHA-256 hash chain',
  'Content-Security-Policy',
];

const PROBLEMS = [
  {
    title: 'Untested recovery is a guess.',
    body: 'Until a server has actually been restored, nobody knows how long recovery takes or what breaks.',
  },
  {
    title: 'Idle hardware is expensive.',
    body: 'A second rack with duplicate servers, licenses and power costs money every month it waits.',
  },
  {
    title: 'Promises do not pass audits.',
    body: 'Auditors, insurers and customers ask for evidence that recovery works, with names and timestamps.',
  },
];

const STEPS: Array<{ icon: LucideIcon; title: string; body: string }> = [
  {
    icon: RefreshCw,
    title: 'Replicate',
    body: 'AWS Elastic Disaster Recovery runs in your own AWS account. An agent streams block-level disk changes, so recovery loses seconds of data, not a day.',
  },
  {
    icon: ShieldCheck,
    title: 'Drill',
    body: 'Recovery drills launch in an isolated network on a schedule, never touching production. Each one needs a requester and a different approver.',
  },
  {
    icon: FileCheck2,
    title: 'Prove',
    body: 'Every drill produces an evidence report: approvals, a timestamped stage timeline, recovery time against target, and the audit entries behind it.',
  },
];

const FEATURES: Array<{ icon: LucideIcon; title: string; body: string }> = [
  {
    icon: Users,
    title: 'Two-person approval',
    body: 'A failover needs a requester and a different approver. A database constraint enforces it, so a modified browser cannot skip it.',
  },
  {
    icon: ScrollText,
    title: 'Tamper-evident audit log',
    body: 'Append-only and chained with SHA-256. Anyone in the organization can verify the chain; an edited entry is named.',
  },
  {
    icon: FileCheck2,
    title: 'Drill evidence reports',
    body: 'Recovery targets, PASS/FAIL history, a print-ready PDF and a fingerprinted JSON file auditors can re-hash themselves.',
  },
  {
    icon: KeyRound,
    title: 'Roles and invites',
    body: 'Admin, approver, operator and viewer. Invites join only a verified email address, and every change is audited.',
  },
];

const CONTROLS: Array<[string, string]> = [
  ['Failover authorization', 'Two-person rule, enforced by a database constraint'],
  ['Tenant isolation', 'PostgreSQL row-level security on every table'],
  ['Audit', 'Append-only log, SHA-256 hash chain, verifiable in the console'],
  ['Browser', "Content-Security-Policy script-src 'self'; no third-party scripts"],
  ['Every change', 'CodeQL, dependency audit and full-history secret scanning in CI'],
  ['Compliance', 'SOC 2 readiness under way; no report yet, and we will not claim one'],
];

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-aether-cyan">{children}</p>
  );
}

function Section({
  id,
  eyebrow,
  title,
  lead,
  children,
}: {
  id: string;
  eyebrow: string;
  title: ReactNode;
  lead?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="w-full max-w-6xl scroll-mt-24">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2
        id={`${id}-title`}
        className="mt-3 max-w-3xl text-3xl sm:text-4xl font-semibold tracking-tight text-white"
      >
        {title}
      </h2>
      {lead && <p className="mt-4 max-w-2xl text-base text-zinc-400 leading-relaxed">{lead}</p>}
      <div className="mt-10">{children}</div>
    </section>
  );
}

function PilotButton({ email, children }: { email: string; children: ReactNode }) {
  return (
    <a
      href={`mailto:${email}?subject=${encodeURIComponent('AetherVault pilot')}`}
      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] text-sm font-semibold text-white transition-colors"
    >
      <Mail className="w-4 h-4" aria-hidden="true" />
      {children}
    </a>
  );
}

function WindowChrome({ title, tag }: { title: string; tag: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-white/[0.08] px-4 py-3">
      <div className="flex items-center gap-3 min-w-0">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        </span>
        <span className="truncate text-xs font-mono text-zinc-400">{title}</span>
      </div>
      <span className="shrink-0 rounded-md border border-aether-amber/30 bg-aether-amber/10 px-2 py-0.5 text-[10px] font-mono tracking-wider text-aether-amber">
        {tag}
      </span>
    </div>
  );
}

function EvidencePreview() {
  return (
    <div className="grid gap-4">
      <div className="landing-ring rounded-2xl bg-aether-panel p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-mono text-zinc-400">Drill evidence report</span>
          <span className="inline-flex items-center gap-1 rounded-full border border-aether-green/40 bg-aether-green/10 px-2 py-0.5 text-[11px] font-mono font-semibold text-aether-green">
            <CheckCircle2 className="w-3 h-3" aria-hidden="true" />
            PASS
          </span>
        </div>
        <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 text-xs">
          {[
            ['Recovery time', '11 min'],
            ['Target', '30 min'],
            ['Two-person rule', 'Met'],
            ['Audit chain', 'Verified'],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="font-mono text-zinc-500">{k}</dt>
              <dd className="mt-0.5 font-semibold text-white">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
      <figure
        aria-label="Illustrative excerpt of an evidence JSON file"
        className="rounded-2xl border border-white/10 bg-black/40 overflow-hidden"
      >
        <WindowChrome title="drill-evidence.json" tag="ILLUSTRATIVE" />
        <pre className="overflow-x-auto p-4 text-[11px] sm:text-xs leading-relaxed font-mono text-zinc-300">
          <code>
            {`{
  "objectives": { "rto_seconds": 1800 },
  "run": {
    "outcome": "secured",
    "two_person_rule_met": true
  },
  "results": {
    "recovery_seconds": 660,
    "rto_met": true
  },
  "audit_entries": [ … ]
}`}
          </code>
        </pre>
        <figcaption className="flex items-center gap-2 border-t border-white/[0.08] px-4 py-3 text-[11px] font-mono text-zinc-400">
          <Fingerprint className="w-3.5 h-3.5 text-aether-cyan" aria-hidden="true" />
          SHA-256 fingerprint printed on the report; anyone can re-hash the file.
        </figcaption>
      </figure>
    </div>
  );
}

function AccessDiagram() {
  return (
    <div
      className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6"
      aria-label="Access model: replication runs inside your AWS account; Aegis Core Labs works through a revocable role logged in CloudTrail"
      role="img"
    >
      <div className="rounded-xl border border-dashed border-aether-cyan/40 p-4">
        <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-aether-cyan">
          Your AWS account
        </p>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {['Replication + snapshots', 'Recovery servers'].map((t) => (
            <div
              key={t}
              className="rounded-lg border border-white/10 bg-aether-panel px-3 py-2 text-xs text-zinc-200"
            >
              {t}
            </div>
          ))}
        </div>
        <p className="mt-3 text-[11px] font-mono text-zinc-500">
          Billed by AWS to you · CloudTrail logs every action
        </p>
      </div>
      <div className="flex items-center gap-3 py-3 pl-6" aria-hidden="true">
        <span className="h-8 border-l border-dashed border-white/30" />
        <span className="text-[11px] font-mono text-zinc-400">
          limited IAM role · you can revoke
        </span>
      </div>
      <div className="rounded-xl border border-white/10 bg-aether-panel px-4 py-3">
        <p className="text-sm font-semibold text-white">Aegis Core Labs</p>
        <p className="text-[11px] font-mono text-zinc-400">monitoring · drills · evidence</p>
      </div>
    </div>
  );
}

export default function LandingPage({
  showSignIn = false,
  contactEmail = CONTACT_EMAIL,
}: LandingPageProps) {
  return (
    <div className="min-h-screen bg-aether-ink text-white font-sans relative overflow-x-hidden antialiased">
      <div
        aria-hidden="true"
        className="landing-glow pointer-events-none absolute inset-x-0 top-0 h-[44rem]"
      />
      <div
        aria-hidden="true"
        className="landing-grid pointer-events-none absolute inset-x-0 top-0 h-[44rem]"
      />

      <header className="sticky top-0 z-30 border-b border-white/[0.06] bg-aether-ink/70 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <a href="#top" className="flex items-center gap-3" aria-label="AetherVault home">
            <img
              src="./aethervault-logo.jpeg"
              alt=""
              className="w-8 h-8 rounded-lg object-cover border border-white/20"
            />
            <span className="text-base font-semibold tracking-tight">AetherVault</span>
          </a>
          <nav aria-label="Main" className="flex items-center gap-1 text-sm">
            <a href="#how" className="hidden md:inline px-3 py-2 text-zinc-400 hover:text-white">
              How it works
            </a>
            <a
              href="#evidence"
              className="hidden md:inline px-3 py-2 text-zinc-400 hover:text-white"
            >
              Evidence
            </a>
            <a
              href="#security"
              className="hidden md:inline px-3 py-2 text-zinc-400 hover:text-white"
            >
              Security
            </a>
            <a
              href="#pricing"
              className="hidden md:inline px-3 py-2 text-zinc-400 hover:text-white"
            >
              Pricing
            </a>
            {showSignIn && (
              <a
                href={CONSOLE_HASH}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-zinc-400 hover:text-white"
              >
                <LogIn className="w-4 h-4" aria-hidden="true" />
                Sign in
              </a>
            )}
            <a
              href={DEMO_HASH}
              className="ml-1 inline-flex items-center gap-1.5 rounded-lg bg-white px-3.5 py-2 text-sm font-semibold text-aether-ink hover:bg-aether-green transition-colors"
            >
              Live demo
            </a>
          </nav>
        </div>
      </header>

      <main
        id="top"
        className="relative z-10 flex flex-col items-center gap-28 sm:gap-36 px-4 pb-24"
      >
        <section
          aria-labelledby="hero-title"
          className="w-full max-w-6xl pt-16 sm:pt-24 text-center"
        >
          <p className="mx-auto inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs font-mono text-zinc-300">
            <span
              className="landing-beacon h-2 w-2 rounded-full bg-aether-green"
              aria-hidden="true"
            />
            Managed disaster recovery on AWS
            <span className="hidden sm:inline text-zinc-600">/</span>
            <span className="hidden sm:inline text-zinc-400">evidence by default</span>
          </p>
          <h1
            id="hero-title"
            className="mx-auto mt-7 max-w-4xl text-[2.75rem] leading-[1.02] sm:text-7xl font-semibold tracking-[-0.04em]"
          >
            Disaster recovery
            <br />
            <span className="landing-gradient-text">you can prove.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-zinc-400 leading-relaxed">
            AetherVault replicates your servers into your own AWS account, rehearses recovery on a
            schedule, and hands you audit-grade evidence every time. Know it works before the day
            you need it.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={DEMO_HASH}
              className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 py-3 rounded-xl bg-aether-green text-sm font-semibold text-aether-ink hover:bg-white transition-colors"
            >
              Launch the live demo
              <ArrowRight
                className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
            <a
              href="#how"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/15 bg-white/[0.03] hover:bg-white/[0.07] text-sm font-semibold text-white transition-colors"
            >
              How it works
            </a>
          </div>
          <p className="mt-4 text-xs font-mono text-zinc-500">
            The live demo runs entirely in your browser on simulated data.
          </p>
          <ul className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-x-6 gap-y-2">
            {SPECS.map((s) => (
              <li key={s} className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-aether-green" aria-hidden="true" />
                {s}
              </li>
            ))}
          </ul>
          <div className="mt-16 text-left">
            <HeroMissionControl />
            <p className="mt-3 text-[11px] font-mono text-zinc-500 text-center">
              RPO and RTO ranges are those AWS documents for Elastic Disaster Recovery; your figures
              are measured in drills.
            </p>
          </div>
        </section>

        <section aria-label="Technology" className="w-full max-w-6xl -mt-12 sm:-mt-20">
          <p className="text-center text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-500">
            Built on
          </p>
          <ul className="mt-5 flex flex-wrap justify-center gap-x-8 gap-y-3">
            {STACK.map((s) => (
              <li key={s} className="text-sm font-medium text-zinc-400">
                {s}
              </li>
            ))}
          </ul>
        </section>

        <Section
          id="problem"
          eyebrow="The problem"
          title="A backup is not a recovery plan."
          lead="Most teams find out how recovery really goes during the outage. That is the worst time to learn."
        >
          <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-3">
            {PROBLEMS.map(({ title, body }, i) => (
              <div key={title} className="bg-aether-ink p-6 sm:p-8">
                <span className="text-xs font-mono text-aether-cyan">0{i + 1}</span>
                <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section
          id="how"
          eyebrow="How it works"
          title={
            <>
              Replicate. Drill. <span className="landing-gradient-text">Prove.</span>
            </>
          }
          lead="A pilot-light architecture: storage-only cost in normal operation, full servers only during a drill or a disaster."
        >
          <div className="mb-4">
            <ReplicationShowcase />
          </div>
          <ol className="grid gap-4 md:grid-cols-3">
            {STEPS.map(({ icon: Icon, title, body }, i) => (
              <li
                key={title}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-aether-cyan/30"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-aether-cyan/30 bg-aether-cyan/10 text-aether-cyan">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <span className="text-xs font-mono text-zinc-600">0{i + 1}</span>
                </div>
                <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{body}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section
          id="evidence"
          eyebrow="Evidence"
          title="Every drill leaves a record an auditor can check."
        >
          <div className="grid gap-10 md:grid-cols-2 md:items-start">
            <div className="space-y-6">
              {[
                [
                  'Who, when, and in what order',
                  'Requester, approver and every stage of the recovery, each with a timestamp.',
                ],
                [
                  'Recovery time against your target',
                  'Set recovery-time and data-loss targets; each drill is marked PASS or FAIL against them.',
                ],
                [
                  'Tamper-evident by construction',
                  'The report includes its audit entries and the chain status. A SHA-256 fingerprint lets anyone confirm a saved copy is unchanged.',
                ],
                [
                  'Honest about what it measures',
                  'Data loss reads "not measured" until real replication data is connected. No invented numbers.',
                ],
              ].map(([t, b]) => (
                <div key={t} className="flex gap-4">
                  <CheckCircle2
                    className="mt-0.5 w-5 h-5 shrink-0 text-aether-green"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-semibold text-white">{t}</h3>
                    <p className="mt-1 text-sm text-zinc-400 leading-relaxed">{b}</p>
                  </div>
                </div>
              ))}
            </div>
            <EvidencePreview />
          </div>
        </Section>

        <Section
          id="product"
          eyebrow="The console"
          title="Built for the people who sign off."
          lead="Controls are enforced in the database, not the browser, and each one has automated tests."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {FEATURES.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-6"
              >
                <Icon className="w-5 h-5 text-aether-green" aria-hidden="true" />
                <h3 className="mt-4 font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs font-mono text-zinc-500">
            Live AWS replication data in the console is in development; until then its replication
            telemetry is simulated and labeled as such.
          </p>
        </Section>

        <Section
          id="security"
          eyebrow="Security"
          title="Your server data stays in your AWS account."
          lead="We work through a role you create, can audit, and can revoke at any time."
        >
          <div className="grid gap-6 md:grid-cols-[1fr_1.2fr]">
            <AccessDiagram />
            <div className="rounded-2xl border border-white/10 overflow-hidden">
              <dl>
                {CONTROLS.map(([k, v], i) => (
                  <div
                    key={k}
                    className={`grid gap-1 px-5 py-4 sm:grid-cols-[11rem_1fr] sm:gap-4 ${
                      i ? 'border-t border-white/[0.08]' : ''
                    }`}
                  >
                    <dt className="text-[11px] font-mono uppercase tracking-[0.14em] text-zinc-500">
                      {k}
                    </dt>
                    <dd className="text-sm text-zinc-200">{v}</dd>
                  </div>
                ))}
              </dl>
              <a
                href={SECURITY_DOC_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border-t border-white/[0.08] px-5 py-4 text-sm text-aether-cyan hover:text-white"
              >
                <Fingerprint className="w-4 h-4" aria-hidden="true" />
                Read the threat model and security controls
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </Section>

        <section
          id="pricing"
          aria-labelledby="pricing-title"
          className="w-full max-w-6xl scroll-mt-24"
        >
          <div className="landing-ring relative overflow-hidden rounded-3xl bg-aether-panel px-6 py-12 sm:px-12 sm:py-16 text-center">
            <div
              aria-hidden="true"
              className="landing-glow pointer-events-none absolute inset-0 opacity-70"
            />
            <div className="relative">
              <Eyebrow>Pricing</Eyebrow>
              <h2
                id="pricing-title"
                className="mx-auto mt-3 max-w-2xl text-3xl sm:text-4xl font-semibold tracking-tight"
              >
                Founding-customer pilots.
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-400 leading-relaxed">
                A one-time setup plus a monthly fee for monitoring, quarterly drills and evidence
                reports. Our first customers get discounted pricing in exchange for feedback and,
                with their approval, a reference. AWS bills its costs to you directly.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={DEMO_HASH}
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 py-3 rounded-xl bg-aether-green text-sm font-semibold text-aether-ink hover:bg-white transition-colors"
                >
                  Launch the live demo
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
                {contactEmail ? (
                  <PilotButton email={contactEmail}>Ask about a pilot</PilotButton>
                ) : (
                  <p className="text-xs font-mono text-zinc-500">Pilot requests open soon.</p>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/[0.06]">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-8 text-xs font-mono text-zinc-500">
          <span>© 2026 Aegis Core Labs · AetherVault</span>
          <span className="flex gap-5">
            <a href={DEMO_HASH} className="hover:text-white">
              Live demo
            </a>
            <a href="#security" className="hover:text-white">
              Security
            </a>
            <a
              href={SECURITY_DOC_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              Threat model
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
