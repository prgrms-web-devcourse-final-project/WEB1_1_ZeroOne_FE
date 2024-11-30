import { RouterProvider } from 'react-router-dom';

import AppRouter from './appRouter';
import AuthProvider from './AuthProvider';
import ModalProvider from './ModalProvider';
import QueryProvider from './QueryProvider';

function App() {
  return (
    <AuthProvider>
      <QueryProvider>
        <ModalProvider>
          <RouterProvider router={AppRouter()} />
        </ModalProvider>
      </QueryProvider>
    </AuthProvider>
  );
}

export default App;
