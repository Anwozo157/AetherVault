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

No Azure or Google Cloud work until AWS is fully proven (supersedes the build plan in
`docs/MULTICLOUD_DR.md`, which stays as research). Oracle Cloud maybe later.

## Roadmap (in order)

1. Bigger-server test with a real write load, 3–4 drills for consistency (plan:
   `docs/AWS_SCALE_TEST_PLAN.md`).
2. Investigate drill 2's ~3 min snapshot fallback.
3. Pilot customer, with drill reports as evidence (needs the legal steps with counsel first).
4. Design the Kubernetes recovery path and a test plan for a small EKS cluster.
5. Warm Standby tier, then Active-Active.
6. SOC 2 work throughout.
