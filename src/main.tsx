/* eslint-disable react-refresh/only-export-components -- app entry point, not a hot-reloaded module */
import React, { Suspense, lazy, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { CONSOLE_HASH, hasBackend, routeFor, type SiteRoute } from './config/backend';
import LandingPage from './features/landing/LandingPage';
import './index.css';

// The landing page is the light first screen. The demo (3D globe, deck) and the signed-in
// console (supabase-js) load only when visited.
const DemoRoot = lazy(() => import('./DemoRoot'));
const ConsoleRoot = lazy(() => import('./console/ConsoleRoot'));

function Loading({ label }: { label: string }) {
  return <p className="p-8 text-xs font-mono text-zinc-500">{label}</p>;
}

function Root() {
  const [route, setRoute] = useState<SiteRoute>(() => routeFor(window.location));

  useEffect(() => {
    const onHashChange = () =>
      setRoute((prev) => {
        const next = routeFor(window.location);
        if (next !== prev) window.scrollTo(0, 0);
        return next;
      });
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  if (route === 'console') {
    return (
      <Suspense fallback={<Loading label="Loading console…" />}>
        <ConsoleRoot />
      </Suspense>
    );
  }
  if (route === 'demo') {
    return (
      <Suspense fallback={<Loading label="Loading demo…" />}>
        <DemoRoot signInHref={hasBackend ? CONSOLE_HASH : undefined} />
      </Suspense>
    );
  }
  return <LandingPage showSignIn={hasBackend} />;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);
