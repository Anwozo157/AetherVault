# 0003. Server-authoritative failover and tamper-evident audit log

- Status: Proposed (2026-11-08)

## Context

Free tiers have no long-running process to drive the timed failover stages. Every viewer must
see the same run, and actions must be provable after the fact.

## Decision

**Failover state is derived, not ticked.** A run stores timestamps (`approved_at`, `aborted_at`,
`reset_at`); the current stage is a pure function of elapsed time since approval, computed by a
Postgres function and mirrored by `src/domain/dr.ts`. Transitions are validated against the same
`ALLOWED_TRANSITIONS` table on both sides. Abort is rejected by the database once DNS cutover
begins.

**Two-person rule.** A run starts only when an approver who is not the requester approves it.

**Audit log is append-only and hash-chained.** Triggers reject UPDATE/DELETE on `audit_log`.
Each row stores `hash = sha256(previous_hash || row_content)`, so any tampering breaks the
chain, and the UI can verify the chain.

## Consequences

- No cron or worker needed: deterministic, testable with fixed clocks.
- Clock source is the database (`now()`), avoiding client clock skew.
- The hash chain detects tampering; it does not prevent a database superuser from rewriting
  history. Stronger guarantees (external anchoring) are a later, funded option.
