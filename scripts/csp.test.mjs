import { describe, expect, test } from 'vitest';
import { buildCsp } from './csp.mjs';

describe('buildCsp', () => {
  test('public build: same-origin only, no inline script or eval', () => {
    const csp = buildCsp(undefined);
    expect(csp).toContain("script-src 'self'");
    expect(csp).not.toMatch(/unsafe-inline|unsafe-eval/);
    expect(csp).toContain("connect-src 'self';");
    expect(csp).toContain("object-src 'none'");
  });

  test('console build: allows exactly the configured database over https and websocket', () => {
    expect(buildCsp('https://abc.supabase.co')).toContain(
      "connect-src 'self' https://abc.supabase.co wss://abc.supabase.co;",
    );
    expect(buildCsp('http://127.0.0.1:54321')).toContain(
      "connect-src 'self' http://127.0.0.1:54321 ws://127.0.0.1:54321;",
    );
  });

  test('rejects non-http database URLs', () => {
    expect(() => buildCsp('javascript:alert(1)')).toThrow(/must be http/);
  });
});
