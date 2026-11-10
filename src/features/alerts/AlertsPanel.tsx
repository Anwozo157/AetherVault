import { RefreshCw, Send, Trash2 } from 'lucide-react';
import { useCallback, useEffect, useState, type FormEvent } from 'react';
import type {
  AlertChannel,
  AlertChannelKind,
  AlertDelivery,
  AlertEvent,
  AlertsCapability,
  MemberRole,
} from '../../domain/dr';

const errText = (e: unknown) => (e instanceof Error ? e.message : String(e));

export const KIND_LABEL: Record<AlertChannelKind, string> = {
  slack: 'Slack',
  pagerduty: 'PagerDuty',
};

export const EVENT_LABEL: Record<AlertEvent, string> = {
  failover: 'Failovers',
  drill_failed: 'Failed drills',
  drill_passed: 'Passed drills',
};

const SECRET_HELP: Record<AlertChannelKind, { label: string; placeholder: string; help: string }> =
  {
    slack: {
      label: 'Slack webhook URL',
      placeholder: 'https://hooks.slack.com/services/…',
      help: 'In Slack: create an app, turn on Incoming Webhooks, add one for the channel, and paste its URL.',
    },
    pagerduty: {
      label: 'PagerDuty integration key',
      placeholder: '32-character key',
      help: 'In PagerDuty: open a service, add an "Events API v2" integration, and paste its integration key. Failovers and failed drills open incidents; withdrawn, aborted or reset failovers resolve them.',
    },
  };

const DEFAULT_EVENTS: Record<AlertChannelKind, AlertEvent[]> = {
  slack: ['failover', 'drill_failed', 'drill_passed'],
  pagerduty: ['failover', 'drill_failed'],
};

const STATUS_CLASS: Record<AlertDelivery['status'], string> = {
  queued: 'text-zinc-400',
  sent: 'text-aether-green',
  failed: 'text-red-300',
};

export default function AlertsPanel({
  alerts,
  myRole,
  refreshKey,
}: {
  alerts: AlertsCapability;
  myRole: MemberRole;
  refreshKey: number | string;
}) {
  const isAdmin = myRole === 'admin';
  const [channels, setChannels] = useState<AlertChannel[] | null>(null);
  const [deliveries, setDeliveries] = useState<AlertDelivery[] | null>(null);
  const [kind, setKind] = useState<AlertChannelKind>('slack');
  const [name, setName] = useState('');
  const [secret, setSecret] = useState('');
  const [events, setEvents] = useState<AlertEvent[]>(DEFAULT_EVENTS.slack);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const [c, d] = await Promise.all([alerts.listChannels(), alerts.listDeliveries()]);
      setChannels(c);
      setDeliveries(d);
    } catch (e) {
      setError(errText(e));
    }
  }, [alerts]);

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
    } catch (e) {
      setError(errText(e));
    } finally {
      setBusy(false);
    }
  };

  const add = (e: FormEvent) => {
    e.preventDefault();
    if (events.length === 0) {
      setError('Choose at least one event.');
      return;
    }
    void act(async () => {
      await alerts.addChannel({ kind, name: name.trim(), secret: secret.trim(), events });
      setName('');
      setSecret('');
      return `${KIND_LABEL[kind]} channel added. Send a test to check it.`;
    });
  };

  const changeKind = (k: AlertChannelKind) => {
    setKind(k);
    setEvents(DEFAULT_EVENTS[k]);
  };

  const toggle = (ev: AlertEvent) =>
    setEvents((cur) => (cur.includes(ev) ? cur.filter((x) => x !== ev) : [...cur, ev]));

  const control =
    'bg-aether-panel border border-white/10 rounded-lg px-2.5 py-2 text-zinc-200 font-mono text-xs focus:outline-none focus:border-aether-cyan/50 disabled:opacity-60';
  const help = SECRET_HELP[kind];

  return (
    <section
      aria-labelledby="alerts-title"
      className="w-full rounded-[2rem] border border-white/10 bg-aether-panel/40 backdrop-blur-3xl p-4 sm:p-6 flex flex-col gap-5"
    >
      <div>
        <h2 id="alerts-title" className="text-sm font-mono uppercase tracking-widest text-white">
          Alerts
        </h2>
        <p className="text-[11px] font-mono text-zinc-400 mt-1 max-w-2xl">
          Send failover requests, approvals, aborts and drill results to Slack or PagerDuty. Secrets
          are encrypted in the database and never shown again; only the last 4 characters are
          displayed. Replication-lag alerts arrive once real replication data is connected
          (telemetry is simulated today).
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Channels</h3>
        {channels === null ? (
          <p className="text-xs font-mono text-zinc-500">Loading channels…</p>
        ) : channels.length === 0 ? (
          <p className="text-xs font-mono text-zinc-500">
            No alert channels yet.{!isAdmin && ' An admin can add one.'}
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {channels.map((c) => (
              <li
                key={c.id}
                data-testid={`channel-${c.name}`}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 px-3 py-2.5"
              >
                <div className="min-w-0">
                  <p className="text-xs font-mono text-zinc-200">
                    <span className={c.kind === 'slack' ? 'text-aether-cyan' : 'text-aether-green'}>
                      {KIND_LABEL[c.kind]}
                    </span>{' '}
                    · {c.name} <span className="text-zinc-500">…{c.hint}</span>
                  </p>
                  <p className="text-[11px] font-mono text-zinc-500 mt-0.5">
                    {c.events.map((ev) => EVENT_LABEL[ev]).join(' · ')}
                    {c.createdByEmail ? ` · added by ${c.createdByEmail}` : ''}
                  </p>
                </div>
                {isAdmin && (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() =>
                        void act(async () => {
                          await alerts.sendTest(c.id);
                          return `Test alert queued for ${c.name}. Its result appears below within a minute.`;
                        })
                      }
                      aria-label={`Send test alert to ${c.name}`}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] text-xs font-mono text-zinc-200 disabled:opacity-60"
                    >
                      <Send className="w-3.5 h-3.5" aria-hidden="true" />
                      Test
                    </button>
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() =>
                        void act(async () => {
                          await alerts.removeChannel(c.id);
                          return `${c.name} removed and its secret deleted.`;
                        })
                      }
                      aria-label={`Remove alert channel ${c.name}`}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/[0.04] hover:bg-aether-red/20 text-xs font-mono text-zinc-300 disabled:opacity-60"
                    >
                      <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                      Remove
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {isAdmin && (
        <form
          onSubmit={add}
          aria-label="Add alert channel"
          className="flex flex-col gap-3 rounded-xl border border-white/10 p-3"
        >
          <div className="flex flex-wrap items-end gap-3">
            <label className="flex flex-col gap-1 text-[10px] font-mono uppercase tracking-widest text-zinc-500">
              Service
              <select
                value={kind}
                disabled={busy}
                onChange={(e) => changeKind(e.target.value as AlertChannelKind)}
                className={control}
              >
                <option value="slack">Slack</option>
                <option value="pagerduty">PagerDuty</option>
              </select>
            </label>
            <label className="flex flex-col gap-1 text-[10px] font-mono uppercase tracking-widest text-zinc-500">
              Name
              <input
                required
                maxLength={60}
                value={name}
                disabled={busy}
                placeholder={kind === 'slack' ? '#dr-alerts' : 'DR on-call'}
                onChange={(e) => setName(e.target.value)}
                className={`${control} w-40`}
              />
            </label>
            <label className="flex flex-col gap-1 text-[10px] font-mono uppercase tracking-widest text-zinc-500 grow min-w-[14rem]">
              {help.label}
              <input
                required
                type="password"
                autoComplete="off"
                spellCheck={false}
                value={secret}
                disabled={busy}
                placeholder={help.placeholder}
                onChange={(e) => setSecret(e.target.value)}
                className={`${control} w-full`}
              />
            </label>
          </div>
          <fieldset className="flex flex-wrap items-center gap-4">
            <legend className="sr-only">Events to send</legend>
            {(Object.keys(EVENT_LABEL) as AlertEvent[]).map((ev) => (
              <label key={ev} className="flex items-center gap-1.5 text-xs font-mono text-zinc-300">
                <input
                  type="checkbox"
                  checked={events.includes(ev)}
                  disabled={busy}
                  onChange={() => toggle(ev)}
                  className="accent-aether-cyan"
                />
                {EVENT_LABEL[ev]}
              </label>
            ))}
            <button
              type="submit"
              disabled={busy}
              className="ml-auto px-4 py-2 rounded-xl bg-aether-cyan/15 hover:bg-aether-cyan/25 border border-aether-cyan/40 text-xs font-mono text-aether-cyan hover:text-white disabled:opacity-60"
            >
              Add channel
            </button>
          </fieldset>
          <p className="text-[11px] font-mono text-zinc-500">
            {help.help}
            {kind === 'pagerduty' && ' Passed drills never page anyone.'}
          </p>
        </form>
      )}

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

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
            Recent deliveries
          </h3>
          <button
            type="button"
            onClick={() => void load()}
            className="inline-flex items-center gap-1 text-[11px] font-mono text-zinc-400 hover:text-white"
          >
            <RefreshCw className="w-3 h-3" aria-hidden="true" />
            Refresh
          </button>
        </div>
        <div className="relative overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full min-w-[640px] text-left text-xs font-mono">
            <caption className="sr-only">Alert deliveries, newest first</caption>
            <thead className="text-[10px] uppercase tracking-widest text-zinc-500 bg-white/[0.02]">
              <tr>
                <th scope="col" className="px-3 py-2">
                  Time
                </th>
                <th scope="col" className="px-3 py-2">
                  Channel
                </th>
                <th scope="col" className="px-3 py-2">
                  Message
                </th>
                <th scope="col" className="px-3 py-2">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {deliveries === null ? (
                <tr>
                  <td colSpan={4} className="px-3 py-6 text-center text-zinc-500">
                    Loading deliveries…
                  </td>
                </tr>
              ) : deliveries.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-3 py-6 text-center text-zinc-500">
                    No alerts sent yet.
                  </td>
                </tr>
              ) : (
                deliveries.map((d) => (
                  <tr key={d.id} className="border-t border-white/5 text-zinc-300 align-top">
                    <td className="px-3 py-2 whitespace-nowrap tabular-nums">
                      {new Date(d.createdAt).toLocaleString()}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      {KIND_LABEL[d.kind]} · {d.channelName}
                    </td>
                    <td className="px-3 py-2 text-zinc-400">{d.title}</td>
                    <td className={`px-3 py-2 whitespace-nowrap ${STATUS_CLASS[d.status]}`}>
                      {d.status === 'queued'
                        ? 'Sending…'
                        : d.status === 'sent'
                          ? `Sent${d.httpStatus ? ` (${d.httpStatus})` : ''}`
                          : `Failed${d.httpStatus ? ` (${d.httpStatus})` : ''}`}
                      {d.status === 'failed' && d.error && (
                        <span
                          className="block text-zinc-500 max-w-[14rem] truncate"
                          title={d.error}
                        >
                          {d.error}
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
