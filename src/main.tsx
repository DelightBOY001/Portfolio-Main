import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

console.log('main.tsx executing');
// Make React available as a global for any compiled modules that expect a global
// `React` identifier (some JSX builds emit `React.createElement` references).
(window as any).React = React;

const rootEl = document.getElementById('root');
if (rootEl) rootEl.innerHTML = '<div id="preload" style="padding:24px;font-family:Arial">Loading app...</div>';

// Import App dynamically so the global React is set before App is evaluated.
(async () => {
  const { default: App } = await import('./App.tsx');
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );

  // expose a flag to help debugging if the app mounted in the browser
  (window as any).__APP_MOUNTED__ = true;
  console.log('main.tsx rendered App');
})();
