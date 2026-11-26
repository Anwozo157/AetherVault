# Product decisions

> Founder decisions, recorded 2026-11-18 from the founder's brief. Recovery times per tier are
> **estimates** (industry patterns, not measured by us) until a test in `docs/AWS_LIVE_POC.md`
> measures them. Today AetherVault is an AWS-only command center: it monitors, drills and evidences
> recovery; it does not build or run the customer's standby infrastructure.

## 1. Warm-up drill at onboarding

Every newly protected server gets one drill right after its initial sync. AWS DRS does one-time
preparation on a server's first recovery (9 min 51 s in our drill 1, 2026-11-17), so a real
disaster must never be that first recovery. See `docs/AWS_DR_BEST_PRACTICES.md` §7.

## 2. Recovery tiers (chosen by how much downtime the customer can tolerate)

| Tier          | What runs in the recovery region                                                             | Recovery time (estimate) | Cost                           | Typical buyer                           |
| ------------- | -------------------------------------------------------------------------------------------- | ------------------------ | ------------------------------ | --------------------------------------- |
| Pilot Light   | Data only; servers launched by DRS, clusters rebuilt from code at recovery                   | ~15–45 min               | Lowest                         | Midsize businesses                      |
| Warm Standby  | A small always-on copy (including a small standby Kubernetes cluster), scaled up on failover | ~2–10 min                | Moderate                       | Healthcare, logistics, e-commerce, SaaS |
| Active-Active | Full production in two regions (later two clouds) serving traffic                            | Near zero                | Roughly doubles infrastructure | Banks, airlines, payments               |

Every tier includes scheduled isolated drills, a drill report (measured recovery time and data loss
against target), the live health console, and moving between tiers.

**Build order:** AetherVault first monitors, drills and evidences whichever strategy a customer
runs. Orchestrating a tier (building or scaling the standby for the customer) comes one tier at a
time, after a paying customer needs it. Orchestration needs write access to the customer's AWS
account: a legal matter (L14 in `docs/LEGAL_PREP_PROMPT.md`) and a security design first.

Pilot Light is what we have proven: drill 2 on 2026-11-17 reached a verified app in 12 min 29 s.

## 3. Kubernetes recovery path

DRS copies machine disks; it is not the right tool for Kubernetes. For clusters:

- Rebuild clusters from infrastructure as code (Terraform); redeploy apps with GitOps (Argo CD or
  Flux).
- Back up and restore persistent data and cluster state with Velero and/or AWS Backup (EBS
  snapshots, cross-region copies).
- Pilot Light: rebuild an EKS cluster at recovery (estimate ~20–40 min, mostly cluster creation).
  Warm Standby: keep a small EKS cluster running in the recovery region (control plane $0.10/hour,
  about $73/month, plus nodes) for minutes-level recovery.
- Reuse blue-green deployment patterns for failover: stand up the second environment, verify,
  switch traffic (Route 53 health checks and failover records).
- Drills recover in dependency order (data stores and identity first, then apps) and verify the
  whole system, not single servers.

## 4. Clouds

**Updated 2026-11-26 (founder):** start Azure and Google Cloud now, **the same way we did AWS**,
everything automated and in infrastructure as code. Order: research
(`docs/MULTICLOUD_RESEARCH_PROMPT.md`) → founder opens accounts → Azure build
(`docs/AZURE_BUILD_PROMPT.md`) → Google Cloud build (`docs/GCP_BUILD_PROMPT.md`). AWS work
continues in parallel (account verification, 130 GiB scale test, failback). New regions stay
demo-only and labeled simulated until real data flows. Oracle Cloud maybe later.

**Caps (founder, 2026-11-26):** budget alerts at $10 and $25 per cloud's live test; the agent stops
and asks at $10; nothing is spent until the founder authorizes it. Start on the free trials;
upgrading needs a separate OK. Google v1 covers Compute Engine VMs only (Asynchronous Replication).

_Superseded (2026-11-18):_ no Azure or Google Cloud work until AWS is fully proven.

**Providers (founder, 2026-11-26):** the big clouds only: AWS, Azure, Google Cloud, then maybe
Oracle Cloud. **One cloud at a time**, but a slow or blocked account on one cloud (for example
AWS's identity review of a personal account) never halts testing on the others. A business
account (LLC, EIN) comes later; until then tests run on personal accounts, with real details that
match the founder's ID and card.

## Roadmap (in order; updated 2026-11-26)

Each cloud climbs the same ladder. A step is done only when its drills meet target **every time**,
reported with every miss.

1. **Small server tests:** one server replicating to a second region, drills measuring recovery
   time and data loss. AWS done 2026-11-17 (best drill 12 min 29 s, ~8 s lost). Azure next, then
   Google Cloud.
2. **Scale test:** a ~100 GiB database under constant writes, repeated drills. AWS run 18–20 Nov:
   of 5 drills, recovery time missed in 2 (by 0.7 s and 1 min 10 s) and **data loss missed in 4**; only drill 4 met both (DRS snapshots fall behind under writes; see `docs/AWS_LIVE_POC.md`). Fix and rerun on AWS once the account is restored.
3. **A whole application** recovered in dependency order (data first, then apps), then failback.
4. **A small Kubernetes cluster** (section 3), then larger clusters.
5. **Warm Standby tier, then Active-Active**, first in one cloud, then across two clouds.
6. **SOC 2 throughout;** pilot customer with drill reports as evidence (legal steps with counsel first).

## Path to enterprise and government buyers (goal, not a claim)

The long-term goal is that agencies such as the FAA could use AetherVault. That is a multi-year
path with gates beyond the technology, in roughly this order:

1. Commercial pilot customer.
2. SOC 2 Type II report (`docs/SOC2_PROGRAM_PROMPT.md`).
3. Regulated industries (healthcare, finance), which need Warm Standby or Active-Active.
4. Government work as a subcontractor to an established federal contractor.
5. FedRAMP authorization (likely Moderate or High; usually needs an agency sponsor), running in the
   government regions (AWS GovCloud, Azure Government).
6. Direct agency contracts.

Nothing public may suggest any of this is in place until it is (`AGENTS.md` rule 2).
