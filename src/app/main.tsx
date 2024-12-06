import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import { worker } from '../mocks/browser';
import './styles/globals.scss';


// if (process.env.NODE_ENV === 'development') {
//   void worker.start({ onUnhandledRequest: 'warn' });
// }


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
);
