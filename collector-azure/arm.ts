// Read-only Azure Resource Manager client for the Site Recovery collector. No secrets on disk:
//   * in Azure Functions: the function's managed identity (IDENTITY_ENDPOINT / IDENTITY_HEADER)
//   * on a laptop (CLI): the signed-in `az login` session
// Only GETs to https://management.azure.com are made, including nextLink pages.
import { execFileSync } from 'node:child_process';
import { ASR_API_VERSION, type AsrReadApi } from '../src/integrations/azureAsr/collect';
import type { AsrPage } from '../src/integrations/azureAsr/snapshot';

const ARM = 'https://management.azure.com';

interface Token {
  value: string;
  expiresAt: number;
}

async function managedIdentityToken(env: NodeJS.ProcessEnv): Promise<Token> {
  const url = new URL(env.IDENTITY_ENDPOINT!);
  url.searchParams.set('resource', `${ARM}/`);
  url.searchParams.set('api-version', '2019-08-01');
  if (env.AZURE_CLIENT_ID) url.searchParams.set('client_id', env.AZURE_CLIENT_ID);
  const res = await fetch(url, { headers: { 'X-IDENTITY-HEADER': env.IDENTITY_HEADER! } });
  if (!res.ok) throw new Error(`managed identity token request failed (HTTP ${res.status})`);
  const body = (await res.json()) as { access_token: string; expires_on: string | number };
  return { value: body.access_token, expiresAt: Number(body.expires_on) * 1000 };
}

function cliToken(): Token {
  const out = execFileSync(
    'az',
    [
      'account',
      'get-access-token',
      '--resource',
      `${ARM}/`,
      '--query',
      '[accessToken,expires_on]',
      '-o',
      'tsv',
    ],
    { encoding: 'utf8' },
  ).trim();
  const [value, expiresOn] = out.split(/\s+/);
  return { value, expiresAt: Number(expiresOn) * 1000 };
}

/** ARM path (starting with /subscriptions/) or a nextLink on management.azure.com. */
export function armUrl(pathOrNextLink: string): string {
  if (/^https?:\/\//.test(pathOrNextLink)) {
    const u = new URL(pathOrNextLink);
    if (u.origin !== ARM) throw new Error(`refusing to follow a link outside ${ARM}`);
    return u.toString();
  }
  if (!/^\/subscriptions\//i.test(pathOrNextLink)) throw new Error('expected an ARM resource path');
  return `${ARM}${pathOrNextLink}?api-version=${ASR_API_VERSION}`;
}

export function armApi(
  opts: { env?: NodeJS.ProcessEnv; onPage?: (url: string, page: unknown) => void } = {},
): AsrReadApi {
  const env = opts.env ?? process.env;
  let token: Token | null = null;
  const getToken = async () => {
    if (!token || token.expiresAt - Date.now() < 5 * 60_000) {
      token =
        env.IDENTITY_ENDPOINT && env.IDENTITY_HEADER ? await managedIdentityToken(env) : cliToken();
    }
    return token.value;
  };
  return {
    async get<T>(pathOrNextLink: string) {
      const url = armUrl(pathOrNextLink);
      const res = await fetch(url, { headers: { Authorization: `Bearer ${await getToken()}` } });
      const text = await res.text();
      if (!res.ok) {
        let message = text.slice(0, 300);
        try {
          message =
            (JSON.parse(text) as { error?: { message?: string } }).error?.message ?? message;
        } catch {
          // not JSON
        }
        throw new Error(`Azure GET failed (HTTP ${res.status}): ${message}`);
      }
      const page = JSON.parse(text) as AsrPage<T>;
      opts.onPage?.(pathOrNextLink, page);
      return page;
    },
  };
}

/** The vault to read and the region it lives in (the recovery region). */
export function vaultFromEnv(env: NodeJS.ProcessEnv = process.env): {
  vaultId: string;
  region: string;
} {
  const vaultId = env.AZURE_VAULT_ID;
  const region = env.AZURE_VAULT_REGION;
  if (
    !vaultId ||
    !/^\/subscriptions\/[^/]+\/resourceGroups\/[^/]+\/providers\/Microsoft\.RecoveryServices\/vaults\/[^/]+$/i.test(
      vaultId,
    )
  ) {
    throw new Error('Set AZURE_VAULT_ID to the Recovery Services vault resource ID');
  }
  if (!region || !/^[a-z]{4,30}[0-9]?$/.test(region)) {
    throw new Error('Set AZURE_VAULT_REGION to the vault region (e.g. westus2)');
  }
  return { vaultId, region };
}
