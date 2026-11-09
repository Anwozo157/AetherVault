// Per-browser onboarding flags (a convenience only; never security-relevant).
const key = (kind: 'verified' | 'dismissed', orgId: string) => `aethervault:${kind}:${orgId}`;

export function readFlag(kind: 'verified' | 'dismissed', orgId: string): boolean {
  try {
    return window.localStorage.getItem(key(kind, orgId)) === '1';
  } catch {
    return false;
  }
}

export function setFlag(kind: 'verified' | 'dismissed', orgId: string) {
  try {
    window.localStorage.setItem(key(kind, orgId), '1');
  } catch {
    // Storage blocked (private mode): the checklist just shows the step as open.
  }
}
