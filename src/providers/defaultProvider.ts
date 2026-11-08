import type { DrProvider } from '../domain/dr';
import { MockDrProvider } from './MockDrProvider';

/**
 * Chooses the provider the app runs with. Only the simulated provider exists
 * today; real providers will be selected here (e.g. by env config) later.
 */
export function createDefaultProvider(): DrProvider {
  return new MockDrProvider();
}
