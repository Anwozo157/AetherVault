# DescribeSourceServers sample responses

Each file is an array of response **pages** from the AWS Elastic Disaster Recovery
`DescribeSourceServers` API (`{ items, nextToken }`).

**These are hand-built, not recorded from a live AWS account** (AetherVault has no AWS
account until funded). Field names, nesting and enum values follow the DRS API reference
(`SourceServer`, `DataReplicationInfo`, `DataReplicationInfoReplicatedDisk`,
`DataReplicationError`, `LifeCycle`, `IdentificationHints`), checked on 2026-11-09.
Account `111122223333` is AWS's documentation example account; hostnames are generic.

Unknowns to confirm against a real account:

- `lagDuration` has no documented format. The collector parses ISO 8601 durations
  (`PT2S`) and plain seconds; anything else is shown as "lag unknown" (never guessed).
- Whether `lagDuration` is present for `STALLED` / `INITIAL_SYNC` servers.

On the first pilot day, run `npm run collector -- --record <file>` against the real
account to save genuine responses (review and redact hostnames before committing), then
add them here and to the tests.

- `healthy.json`: 3 servers over 2 pages (pagination), all replicating within seconds.
- `degraded.json`: one healthy, one in `BACKLOG` (2 min 10 s lag, 3 GiB backlog), one
  `STALLED` with `UNSTABLE_NETWORK`, one in `INITIAL_SYNC`.
