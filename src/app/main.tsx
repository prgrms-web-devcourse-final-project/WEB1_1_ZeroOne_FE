import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { worker } from '../mocks/browser';

import './styles/globals.scss';
import App from './App';

if (process.env.NODE_ENV === 'development') {
  worker.start();
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
