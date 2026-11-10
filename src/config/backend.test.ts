import { describe, expect, test } from 'vitest';
import { hasBackend, isConsoleRoute, routeFor } from './backend';

describe('backend config', () => {
  test('console route: hash or magic-link return', () => {
    expect(isConsoleRoute({ hash: '#/console', search: '' })).toBe(true);
    expect(isConsoleRoute({ hash: '', search: '?console&code=abc' })).toBe(true);
    expect(isConsoleRoute({ hash: '#/', search: '' })).toBe(false);
    expect(isConsoleRoute({ hash: '', search: '' })).toBe(false);
  });

  test('site routes: landing at the root, demo and console by hash', () => {
    expect(routeFor({ hash: '', search: '' })).toBe('landing');
    expect(routeFor({ hash: '#/', search: '' })).toBe('landing');
    expect(routeFor({ hash: '#how', search: '' })).toBe('landing');
    expect(routeFor({ hash: '#/demo', search: '?v=abc1234' })).toBe('demo');
    expect(routeFor({ hash: '#/console', search: '' })).toBe('console');
    expect(routeFor({ hash: '', search: '?console&code=abc' })).toBe('console');
  });

  test('unit tests run without a backend configured (public demo default)', () => {
    expect(hasBackend).toBe(false);
  });
});
