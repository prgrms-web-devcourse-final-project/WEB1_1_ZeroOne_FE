import { createBrowserRouter } from 'react-router-dom';

import {
  ArchiveListPage,
  DetailArchivePage,
  GatheringDetailPage,
  GatheringListPage,
  PortfolioListPage,
  RegisterPage,
  SearchPage,
  UserPage,
  WriteArchivePage,
  WriteGatheringPage,
  LikeListPage,
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
          element: <UserPage />,
        },
        {
          path: '/register',
          element: <RegisterPage />,
        },
        {
          path: '/like',
          element: <LikeListPage />,
        },
      ],
    },
  ]);
};

export default AppRouter;
