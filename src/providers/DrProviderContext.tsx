import { createContext, useContext, type ReactNode } from 'react';
import type { DrProvider } from '../domain/dr';

const DrProviderContext = createContext<DrProvider | null>(null);

export function DrProviderRoot({
  provider,
  children,
}: {
  provider: DrProvider;
  children: ReactNode;
}) {
  return <DrProviderContext.Provider value={provider}>{children}</DrProviderContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useDrProvider(): DrProvider {
  const provider = useContext(DrProviderContext);
  if (!provider) throw new Error('useDrProvider must be used inside <DrProviderRoot>');
  return provider;
}
