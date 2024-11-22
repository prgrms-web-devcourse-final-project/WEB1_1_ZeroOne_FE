import { RouterProvider } from 'react-router-dom';

import AppRouter from './appRouter';
import QueryProvider from './QueryProvider';

function App() {
  return (
    <QueryProvider>
      <RouterProvider router={AppRouter()} />
    </QueryProvider>
  );
}

export default App;
