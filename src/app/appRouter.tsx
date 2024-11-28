import { createBrowserRouter } from 'react-router-dom';

import {
  GatheringListPage,
  WriteArchivePage,
  DetailArchivePage,
  WriteGatheringPage,
  PortfolioListPage,
} from '@/pages';
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
          element: <PortfolioListPage />,
        },
        {
          path: '/archive',
          element: <WriteArchivePage />,
        },
        {
          path: '/archive/:id',
          element: <DetailArchivePage />,
        },
        {
          path: '/gathering',
          element: <GatheringListPage />,
        },
        {
          path: '/gathering/write',
          element: <WriteGatheringPage />,
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
