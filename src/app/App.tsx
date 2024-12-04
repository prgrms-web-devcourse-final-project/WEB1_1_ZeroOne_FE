import { RouterProvider } from 'react-router-dom';

import AppRouter from './appRouter';
import ModalProvider from './ModalProvider';
import QueryProvider from './QueryProvider';

function App() {
  return (
    <QueryProvider>
      <ModalProvider>
        <RouterProvider router={AppRouter()} />
      </ModalProvider>
    </QueryProvider>
  );
}

export default App;
