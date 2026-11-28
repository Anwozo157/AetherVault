# Azure Site Recovery fixtures

Responses the Azure collector parses (`replicationProtectedItems`, `replicationJobs`, REST
api-version 2025-08-01), trimmed to the fields the mapper reads.

| File                                                           | Origin                                                                                                                                                                                   |
| -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `protected-items.recorded-healthy.json`                        | **Recorded** 2026-11-28 from our own test subscription (`azure-source.sh record`), redacted: subscription and tenant IDs zeroed, storage names and IPs replaced. Health Normal, RPO 82 s |
| `protected-items.recorded-tfo-warning.json`                    | **Recorded** 2026-11-27 right after initial sync, redacted. Health Normal with a warning-level health error (161011, "no test failover yet")                                             |
| `replication-jobs.recorded.json`                               | **Recorded** 2026-11-28, redacted: the test's real jobs (EnableDr, TestFailover, TestFailoverCleanup, …)                                                                                 |
| `protected-items.critical.json`                                | **Hand-built** from the recorded item: health Critical with an error-level health error                                                                                                  |
| `protected-items.paged-1.json`, `protected-items.paged-2.json` | **Hand-built**: a `nextLink` page pair; page 2 is a second VM in initial replication (42 %)                                                                                              |

Values Microsoft's docs don't list (protection states beyond `Protected`, health beyond `Normal`)
map to `UNKNOWN` until a recording shows them; see `docs/AZURE_LIVE_POC.md`.
