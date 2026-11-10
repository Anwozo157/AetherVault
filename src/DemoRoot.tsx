// Composition root for the public simulated demo (loaded lazily on #/demo).
// Like main.tsx and ConsoleRoot, one of the places allowed to construct a concrete provider.
import App from './App';
import { DrProviderRoot } from './providers/DrProviderContext';
import { createDefaultProvider } from './providers/defaultProvider';

let demoProvider: ReturnType<typeof createDefaultProvider> | null = null;

export default function DemoRoot({ signInHref }: { signInHref?: string }) {
  // One provider for the page's lifetime, so leaving and re-opening the demo keeps its state.
  demoProvider ??= createDefaultProvider();
  return (
    <DrProviderRoot provider={demoProvider}>
      <App signInHref={signInHref} />
    </DrProviderRoot>
  );
}
