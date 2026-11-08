/* eslint-disable react-refresh/only-export-components -- app entry point, not a hot-reloaded module */
import React, { Suspense, lazy, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CONSOLE_HASH, hasBackend, isConsoleRoute } from './config/backend';
import { DrProviderRoot } from './providers/DrProviderContext';
import { createDefaultProvider } from './providers/defaultProvider';
import './index.css';

// The signed-in console (and supabase-js) loads only when visited, keeping the public demo light.
const ConsoleRoot = lazy(() => import('./console/ConsoleRoot'));

const demoProvider = createDefaultProvider();

function Root() {
  const [onConsole, setOnConsole] = useState(() => isConsoleRoute(window.location));

  useEffect(() => {
    const onHashChange = () => setOnConsole(isConsoleRoute(window.location));
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  if (onConsole) {
    return (
      <Suspense fallback={<p className="p-8 text-xs font-mono text-zinc-500">Loading console…</p>}>
        <ConsoleRoot />
      </Suspense>
    );
  }
  return (
    <DrProviderRoot provider={demoProvider}>
      <App signInHref={hasBackend ? CONSOLE_HASH : undefined} />
    </DrProviderRoot>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);
