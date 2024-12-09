import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import './styles/globals.scss';

import { worker } from '@/mocks/browser';

if (process.env.NODE_ENV === 'development') {
  void worker.start({ onUnhandledRequest: 'warn' });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
