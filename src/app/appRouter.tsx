import { createBrowserRouter } from 'react-router-dom';

import {
  ArchiveListPage,
  DetailArchivePage,
  GatheringDetailPage,
  GatheringListPage,
  PortfolioListPage,
  RegisterPage,
  SearchPage,
  WriteArchivePage,
  WriteGatheringPage,
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
          element: <ArchiveListPage />,
        },
        {
          path: '/archive/write',
          element: <WriteArchivePage />,
        },
        {
          path: '/archive/:archiveId',
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
          path: '/gathering/:gatheringId',
          element: <GatheringDetailPage />,
        },
        {
          path: '/search',
          element: <SearchPage />,
        },
        {
          path: '/user',
          element: <>{/** userPage */}</>,
        },
        {
          path: '/register',
          element: <RegisterPage />,
        },
      ],
    },
  ]);
};

export default AppRouter;
