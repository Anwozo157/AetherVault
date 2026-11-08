import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { DrProviderRoot } from './providers/DrProviderContext';
import { createDefaultProvider } from './providers/defaultProvider';
import './index.css';

const provider = createDefaultProvider();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DrProviderRoot provider={provider}>
      <App />
    </DrProviderRoot>
  </React.StrictMode>,
);
