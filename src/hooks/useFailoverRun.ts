import { useEffect, useState } from 'react';
import type { FailoverRun } from '../domain/dr';
import { useDrProvider } from '../providers/DrProviderContext';

/** The organization's open failover run, for providers with two-person approval. */
export function useFailoverRun(): FailoverRun | null {
  const provider = useDrProvider();
  const [run, setRun] = useState<FailoverRun | null>(() => provider.approvals?.getRun() ?? null);
  useEffect(() => {
    setRun(provider.approvals?.getRun() ?? null);
    return provider.approvals?.onRunChange(setRun);
  }, [provider]);
  return run;
}
