# AetherVault Service Level Agreement (DRAFT for legal review)

> Not in effect. Placeholders in [brackets]. Not legal advice. **Do not offer an availability
> commitment until the database is on a plan without idle pausing (Supabase Pro) and uptime
> monitoring is running.**

## Availability

- **Target:** [99.5%] monthly availability of the AetherVault console, measured by external uptime
  monitoring of the sign-in page and database API, excluding scheduled maintenance announced 48 hours
  ahead and events outside our reasonable control.
- **Status page:** [status URL], with incident updates.
- **Service credits:** [counsel to define, e.g. 10% of the month's fee below target, 25% below 99%].

## Support

| Severity                                                      | First response                     |
| ------------------------------------------------------------- | ---------------------------------- |
| Critical: console unavailable during an active failover/drill | [1 hour, 24×7 via phone/PagerDuty] |
| High: a feature unavailable, no workaround                    | [4 business hours]                 |
| Normal: questions, minor issues                               | [1 business day]                   |

Contact: support@getaethervault.com; security issues: security@getaethervault.com.

## Security incidents

We notify affected customers without undue delay and within 72 hours of confirming an incident that
affects their data.

## Data and recovery

Our own recovery targets for the console are published in our business continuity plan
([RTO/RPO]); backups are encrypted and restore-tested quarterly.

## Customer responsibilities

As listed in the system description (complementary user entity controls): manage your users, protect
your email accounts and AWS account, secure the collector token, run recovery launches in DRS.
