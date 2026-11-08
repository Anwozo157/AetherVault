import { describe, expect, test } from 'vitest';
import { hasBackend, isConsoleRoute } from './backend';

describe('backend config', () => {
  test('console route: hash or magic-link return', () => {
    expect(isConsoleRoute({ hash: '#/console', search: '' })).toBe(true);
    expect(isConsoleRoute({ hash: '', search: '?console&code=abc' })).toBe(true);
    expect(isConsoleRoute({ hash: '#/', search: '' })).toBe(false);
    expect(isConsoleRoute({ hash: '', search: '' })).toBe(false);
  });

  test('unit tests run without a backend configured (public demo default)', () => {
    expect(hasBackend).toBe(false);
  });
});
