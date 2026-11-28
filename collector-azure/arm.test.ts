import { describe, expect, test } from 'vitest';
import { armUrl, vaultFromEnv } from './arm';

const VAULT =
  '/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg-x/providers/Microsoft.RecoveryServices/vaults/rsv-x';

describe('armUrl', () => {
  test('adds the api-version to resource paths, any capitalization Azure returns', () => {
    expect(armUrl(`${VAULT}/replicationFabrics`)).toBe(
      `https://management.azure.com${VAULT}/replicationFabrics?api-version=2025-08-01`,
    );
    expect(armUrl('/Subscriptions/0/resourceGroups/r/x')).toMatch(
      /^https:\/\/management\.azure\.com\/Subscriptions\//,
    );
  });
  test('follows nextLink only on management.azure.com', () => {
    const next =
      'https://management.azure.com/subscriptions/0/x?api-version=2025-08-01&$skiptoken=a';
    expect(armUrl(next)).toBe(new URL(next).toString());
    expect(() => armUrl('https://evil.example/subscriptions/0')).toThrow(/outside/);
    expect(() => armUrl('http://management.azure.com/subscriptions/0')).toThrow(/outside/);
  });
  test('rejects anything that is not an ARM path', () => {
    expect(() => armUrl('/providers/x')).toThrow(/ARM resource path/);
  });
});

describe('vaultFromEnv', () => {
  test('accepts a vault ID and an Azure region', () => {
    expect(vaultFromEnv({ AZURE_VAULT_ID: VAULT, AZURE_VAULT_REGION: 'westus2' })).toEqual({
      vaultId: VAULT,
      region: 'westus2',
    });
  });
  test.each([
    [{ AZURE_VAULT_REGION: 'westus2' }, /AZURE_VAULT_ID/],
    [{ AZURE_VAULT_ID: `${VAULT}/extra`, AZURE_VAULT_REGION: 'westus2' }, /AZURE_VAULT_ID/],
    [{ AZURE_VAULT_ID: VAULT, AZURE_VAULT_REGION: 'us-west-2' }, /AZURE_VAULT_REGION/],
  ])('%o is rejected', (env, msg) => expect(() => vaultFromEnv(env)).toThrow(msg));
});
