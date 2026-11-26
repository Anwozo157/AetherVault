-- pgTAP tests: Azure Site Recovery data next to AWS DRS (snapshots, recovery jobs, linking).
begin;
create extension if not exists pgtap with schema extensions;
select plan(20);

insert into auth.users (id, email, aud, role) values
  ('fa000000-0000-0000-0000-000000000001', 'admin@mc.local', 'authenticated', 'authenticated');
insert into public.orgs (id, name) values ('fb000000-0000-0000-0000-000000000001', 'MC Org');
insert into public.memberships (org_id, user_id, role) values
  ('fb000000-0000-0000-0000-000000000001', 'fa000000-0000-0000-0000-000000000001', 'admin');
insert into public.ingest_tokens (org_id, token_hash, hint) values
  ('fb000000-0000-0000-0000-000000000001',
   encode(extensions.digest('avi_mc_token', 'sha256'), 'hex'), 'avi_…oken');

-- Region names
select ok(public.valid_cloud_region('aws-drs', 'us-west-2'), 'AWS Region accepted for AWS');
select ok(not public.valid_cloud_region('aws-drs', 'westus2'), 'Azure region rejected for AWS');
select ok(public.valid_cloud_region('azure-asr', 'westus2'), 'Azure region accepted for Azure');
select ok(not public.valid_cloud_region('azure-asr', 'us-west-2'), 'AWS Region rejected for Azure');
select ok(public.valid_cloud_region('fixture', 'eastus') and public.valid_cloud_region('fixture', 'us-east-1'),
  'sample data may use either cloud');
select ok(not public.valid_cloud_region('gcp-async-pd', 'us-central1'), 'unknown clouds rejected');

-- Snapshots
select is((public.ingest_replication_snapshot('avi_mc_token', jsonb_build_object(
    'source', 'azure-asr', 'collected_at', now(), 'aws_account_id', null, 'aws_region', 'westus2',
    'collector_version', 'test',
    'servers', jsonb_build_array(jsonb_build_object('id', 'vm-1', 'hostname', 'db-1',
      'state', 'CONTINUOUS', 'lag_seconds', 42, 'backlog_bytes', 0, 'total_bytes', 0, 'replicated_bytes', 0)))
  ))->>'accepted', 'true', 'an Azure snapshot is accepted');
select is((select source || ' ' || aws_region from public.replication_snapshots
            where org_id = 'fb000000-0000-0000-0000-000000000001'), 'azure-asr westus2', 'stored with its cloud and region');
select is((select servers->0->>'health' from public.replication_snapshots
            where org_id = 'fb000000-0000-0000-0000-000000000001'), 'healthy', 'health computed from the mapped state');
delete from public.replication_snapshots where org_id = 'fb000000-0000-0000-0000-000000000001';
select throws_ok($$ select public.ingest_replication_snapshot('avi_mc_token', jsonb_build_object(
    'source', 'azure-asr', 'collected_at', now(), 'aws_region', 'us-west-2', 'servers', '[]'::jsonb)) $$,
  '23514', null, 'an Azure snapshot with an AWS Region is rejected');
select throws_ok($$ select public.ingest_replication_snapshot('avi_mc_token', jsonb_build_object(
    'source', 'azure-asr', 'collected_at', now(), 'aws_account_id', '123456789012', 'aws_region', 'westus2',
    'servers', '[]'::jsonb)) $$,
  '23514', null, 'an Azure snapshot never carries an AWS account');

-- Recovery jobs
select is((public.ingest_recovery_jobs('avi_mc_token', 'westus2', jsonb_build_array(jsonb_build_object(
    'job_id', '0a1b2c3d-0000-4000-8000-000000000001', 'kind', 'drill', 'status', 'COMPLETED',
    'started_at', '2026-11-26T10:00:00Z', 'ended_at', '2026-11-26T10:12:00Z', 'servers', 1, 'launched', 1)),
  'azure-asr'))->>'changed', '1', 'Azure jobs are ingested');
select is((public.ingest_recovery_jobs('avi_mc_token', 'us-west-2', jsonb_build_array(jsonb_build_object(
    'job_id', 'drsjob-00000000000000009', 'kind', 'drill', 'status', 'COMPLETED',
    'started_at', '2026-11-26T10:00:00Z', 'ended_at', '2026-11-26T10:10:00Z', 'servers', 1, 'launched', 1))
  ))->>'changed', '1', 'AWS collectors without p_source keep working');
select is((select source from public.recovery_jobs where job_id = 'drsjob-00000000000000009'), 'aws-drs',
  'jobs default to AWS');
select throws_ok($$ select public.ingest_recovery_jobs('avi_mc_token', 'us-west-2', '[]'::jsonb, 'azure-asr') $$,
  'invalid Azure region', 'Azure jobs need an Azure region');
select throws_ok($$ select public.ingest_recovery_jobs('avi_mc_token', 'westus2', jsonb_build_array(jsonb_build_object(
    'job_id', 'drsjob-0000000000000000a', 'kind', 'drill', 'status', 'COMPLETED',
    'started_at', '2026-11-26T10:00:00Z', 'servers', 1, 'launched', 1)), 'azure-asr') $$,
  '23514', null, 'Azure jobs need an Azure job ID');

-- Linking an Azure job to a run targeting azure-<region>
insert into public.failover_runs
  (id, org_id, kind, trigger, source_region, target_region, requested_by, requested_at, approved_at, completed_at)
values
  ('fc000000-0000-0000-0000-000000000001', 'fb000000-0000-0000-0000-000000000001', 'drill', 'manual',
   'eastus', 'azure-westus2', 'fa000000-0000-0000-0000-000000000001',
   '2026-11-26T09:59:00Z', '2026-11-26T09:59:00Z', '2026-11-26T10:20:00Z'),
  ('fc000000-0000-0000-0000-000000000002', 'fb000000-0000-0000-0000-000000000001', 'drill', 'manual',
   'us-east-1', 'aws-us-west-2', 'fa000000-0000-0000-0000-000000000001',
   '2026-11-26T09:58:00Z', '2026-11-26T09:58:00Z', '2026-11-26T10:20:00Z');

select set_config('request.jwt.claims',
  json_build_object('sub', 'fa000000-0000-0000-0000-000000000001', 'role', 'authenticated')::text, true);
set local role authenticated;

select throws_ok($$ select public.link_recovery_job('fc000000-0000-0000-0000-000000000002',
    '0a1b2c3d-0000-4000-8000-000000000001') $$,
  'the Azure job ran in a different Region than this run', 'an Azure job cannot measure an AWS run');
select is(public.link_recovery_job('fc000000-0000-0000-0000-000000000001', '0a1b2c3d-0000-4000-8000-000000000001'),
  720.0, 'an Azure job measures an Azure run (12 min)');
select is((select recovery_measured->>'source' from public.failover_runs
            where id = 'fc000000-0000-0000-0000-000000000001'), 'azure-asr', 'the evidence names the cloud');
select is((select j->>'source' from jsonb_array_elements(
            public.list_recovery_jobs('fb000000-0000-0000-0000-000000000001')) j
            where j->>'job_id' = '0a1b2c3d-0000-4000-8000-000000000001'), 'azure-asr', 'job list shows the cloud');

select * from finish();
rollback;
