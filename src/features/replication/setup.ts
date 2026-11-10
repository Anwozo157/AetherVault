// Helpers for the Connect-your-AWS-account guide: regions, agent commands, Terraform settings.

/** Regions offered as the recovery (replication target) region. */
export const DRS_REGIONS = [
  ['us-east-1', 'US East (N. Virginia)'],
  ['us-east-2', 'US East (Ohio)'],
  ['us-west-1', 'US West (N. California)'],
  ['us-west-2', 'US West (Oregon)'],
  ['ca-central-1', 'Canada (Central)'],
  ['eu-west-1', 'Europe (Ireland)'],
  ['eu-central-1', 'Europe (Frankfurt)'],
  ['ap-southeast-2', 'Asia Pacific (Sydney)'],
] as const;

/** terraform.tfvars for collector/terraform, filled in from this console. */
export function tfvars(region: string, url: string, anonKey: string, token: string | null): string {
  return [
    `drs_region           = "${region}"`,
    `aethervault_url      = "${url}"`,
    `aethervault_anon_key = "${anonKey}"`,
    `# Secret: keep this file out of git and chat. Rotate it in the console if it leaks.`,
    `ingest_token         = "${token ?? 'PASTE_THE_TOKEN_YOU_SAVED'}"`,
    '',
  ].join('\n');
}

export function agentCommands(region: string): { linux: string; windows: string } {
  const base = `https://aws-elastic-disaster-recovery-${region}.s3.${region}.amazonaws.com/latest`;
  return {
    linux: [
      `wget -O ./aws-replication-installer-init ${base}/linux/aws-replication-installer-init`,
      'chmod +x aws-replication-installer-init',
      '# Temporary credentials from a role with AWSElasticDisasterRecoveryAgentInstallationPolicy',
      'export AWS_ACCESS_KEY_ID=... AWS_SECRET_ACCESS_KEY=... AWS_SESSION_TOKEN=...',
      `sudo -E ./aws-replication-installer-init --region ${region} --no-prompt`,
    ].join('\n'),
    windows: [
      `Invoke-WebRequest ${base}/windows/AwsReplicationWindowsInstaller.exe -OutFile AwsReplicationWindowsInstaller.exe`,
      '# Temporary credentials from a role with AWSElasticDisasterRecoveryAgentInstallationPolicy',
      '$env:AWS_ACCESS_KEY_ID="..."; $env:AWS_SECRET_ACCESS_KEY="..."; $env:AWS_SESSION_TOKEN="..."',
      `.\\AwsReplicationWindowsInstaller.exe --region ${region} --no-prompt`,
    ].join('\n'),
  };
}
