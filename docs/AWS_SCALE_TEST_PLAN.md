# Scale test plan: bigger servers, real write load, repeated drills

> PLAN, not run. Drafted 2026-11-18. Costs are **estimates** from AWS list prices (us-east-1 /
> us-west-2); confirm on the AWS pricing pages before starting. Nothing is built until the founder
> approves the budget. Results go into `docs/AWS_LIVE_POC.md` in the 17 Nov record's format.

## Goal

Show that recovery stays within target on a realistic server under a steady write load, and does
so **every time**, not once. The 17 Nov test proved it on an idle 8 GiB server with one drill
inside target.

## Phase A: one database server, under load (fits the account's current quotas)

- **Source (us-east-1):** t3.medium, 100 GiB gp3, encrypted, no inbound ports, SSM only (same
  hardening as 17 Nov). PostgreSQL with `pgbench` writing continuously, plus a writer that commits
  one numbered, timestamped row per second.
- **Recovery (us-west-2):** DRS as on 17 Nov; replication server t3.small.
- **Data loss measured from the database:** after each drill, the last committed row on the drill
  server vs the last row written before the request. More exact than the heartbeat file.
- **Recovery measured to a verified database:** Postgres accepts queries and the row check passes;
  timings from AWS's job log and CloudTrail.

| Step | What                                                           | Records                                                    |
| ---- | -------------------------------------------------------------- | ---------------------------------------------------------- |
| A1   | Build source, start load, install agent                        | Install-to-continuous time for 100 GiB                     |
| A2   | Lag under load for 24 h                                        | Lag and backlog every minute (collector), worst lag        |
| A3   | Warm-up drill (first recovery, expected slow)                  | Per-stage times; confirms the one-time prep                |
| A4   | Drills 2–4, a few hours apart                                  | Recovery time and data loss each; median and worst         |
| A5   | One drill from the last finished snapshot instead of a new one | Does it remove the ~3 min wait, and at what data-loss cost |
| A6   | Tear down; bill check the next day                             | Actual cost vs this estimate                               |

**Success:** every drill after the warm-up reaches a verified database in ≤ 15 min with ≤ 60 s of
data loss. Report every drill, including any miss.

### Cost estimate (Phase A, 3 days)

| Item                                                            | Estimate    |
| --------------------------------------------------------------- | ----------- |
| DRS, 1 source server ($0.028/hour × 72 h)                       | ~$2         |
| Source t3.medium ($0.0416/hour × 72 h)                          | ~$3         |
| Replication server t3.small ($0.0208/hour × 72 h)               | ~$1.50      |
| Source and staging disks, 2 × 100 GiB gp3, 3 days               | ~$1.60      |
| Snapshots (~150 GB for 3 days)                                  | ~$0.75      |
| Cross-region transfer (~100 GB initial + write churn, $0.02/GB) | ~$3–4       |
| 4 drill servers, ~1 h each, plus conversion                     | ~$1         |
| **Total**                                                       | **~$13–15** |

Proposed cap: **$25** (the existing budget alert). Stop and ask if the forecast passes $15. The
write rate drives transfer cost: about 200 KB/s (~17 GB/day) keeps it in this range.

## Phase B: a whole application, recovered in dependency order

The stronger demonstration: a three-server app (database, application, web front end) recovered
together, database first, then verified end to end (a page that reads and writes through all three
tiers). This is the "verify the whole system" decision in `docs/PRODUCT_DECISIONS.md`.

**Blocker:** the account allows 5 standard vCPUs per region; three drill servers plus the
replication server need about 8. Requesting a quota increase is free but takes days, so file it
now (founder approves) and run Phase B after Phase A. Cost estimate: roughly double Phase A for
the same three days (~$25–35); re-estimate before starting.

## Open questions

- Write rate: 200 KB/s keeps cost down; a heavier rate is more convincing but costs more transfer.
- Phase A5 trades data loss for speed; is a faster, lossier option something customers would choose?
