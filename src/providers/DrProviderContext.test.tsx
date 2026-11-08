import { describe, test, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';
import { DrProviderRoot, useDrProvider } from './DrProviderContext';
import { createDefaultProvider } from './defaultProvider';
import { MockDrProvider } from './MockDrProvider';

describe('DrProviderContext', () => {
  test('useDrProvider returns the provider from the nearest root', () => {
    const provider = new MockDrProvider();
    const wrapper = ({ children }: { children: ReactNode }) => (
      <DrProviderRoot provider={provider}>{children}</DrProviderRoot>
    );
    const { result } = renderHook(() => useDrProvider(), { wrapper });
    expect(result.current).toBe(provider);
    provider.dispose();
  });

  test('useDrProvider throws a clear error outside a root', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => renderHook(() => useDrProvider())).toThrow(/inside <DrProviderRoot>/);
    vi.restoreAllMocks();
  });
});

describe('createDefaultProvider', () => {
  test('returns the simulated provider for the public demo', () => {
    const provider = createDefaultProvider();
    expect(provider.isSimulated).toBe(true);
    provider.dispose();
  });
});
