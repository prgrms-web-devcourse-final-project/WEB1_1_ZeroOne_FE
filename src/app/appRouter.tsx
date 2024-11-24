import { createBrowserRouter } from 'react-router-dom';

import { GatheringListPage } from '@/pages';
// import WriteArchivePage from '@/pages';
import { Layout } from '@/widgets';

const AppRouter = () => {
  return createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <>{/** mainPage */}</>,
        },
        {
          path: '/portfolio',
          element: <>{/** portfolioPage */}</>,
        },
        {
          path: '/archive',
          // element: <WriteArchivePage />,
        },
        {
          path: '/gathering',
          element: <GatheringListPage />,
        },
        {
          path: '/user',
          element: <>{/** userPage */}</>,
        },
      ],
    },
  ]);
};

export default AppRouter;
