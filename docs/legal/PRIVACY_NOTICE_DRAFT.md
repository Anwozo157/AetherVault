# AetherVault Privacy Notice (DRAFT for legal review)

> Not in effect. Placeholders in [brackets]. Not legal advice.

**Last updated:** [date] · **Company:** [Aegis Core Labs legal entity name and address]

## What we collect

- **Account data:** your email address, used to sign you in with a one-time link.
- **What your organization enters:** organization name, team members and roles, recovery objectives,
  runbooks and checklist notes, alert settings.
- **Activity:** an audit log of actions taken in the console (who, what, when).
- **Replication status:** if your organization connects AWS Elastic Disaster Recovery, the status your
  collector sends us (server identifiers and hostnames, your AWS account ID and Region, replication
  state and lag). We keep these status reports for 7 days.
- **Technical logs:** our hosting and email providers keep request logs (for example IP address,
  browser and time) to run and secure their services, under their own retention.

We do not use analytics, advertising or tracking cookies. The public website and demo collect no
personal data.

## How we use it

Only to provide and secure AetherVault: signing you in, showing your organization's data to its
members, producing audit and drill evidence, sending the alerts your organization configured, and
responding to support and security requests.

## Who we share it with

Service providers that run parts of AetherVault ("sub-processors"): Supabase (database and sign-in,
United States), Resend (sign-in email), Cloudflare (domain and email routing), GitHub (website hosting;
no account data). Alert content goes to the Slack or PagerDuty destinations your organization sets up.
We do not sell personal data. We disclose data if the law requires it.

## Security

Encryption in transit and at rest, role-based access, two-person approval for failovers and a
tamper-evident audit log. See [security page / SECURITY.md link].

## Retention

We keep your organization's data while it has an account and delete it within 30 days of a written
request after the account ends. The audit log can't be edited (that is what makes it tamper-evident)
and records team members' email addresses when they are invited, join or are removed, so it is deleted
together with the organization. Encrypted backups keep copies for up to [8 weeks] before they are
replaced. [Counsel: individual deletion requests vs. the append-only log; see DATA_INVENTORY.md Q1–Q2.]

## Where data is stored

In the United States (our database provider's US East region). [Counsel: international users.]

## Your choices and rights

Ask us to access, correct or delete your data at [privacy contact, e.g. support@getaethervault.com].
[Counsel: add state/GDPR-specific rights as applicable.]

## Changes

We'll post updates here and tell organization admins about material changes.
