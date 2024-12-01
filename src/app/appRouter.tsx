import { createBrowserRouter } from 'react-router-dom';

import {
  GatheringListPage,
  DetailArchivePage,
  ArchiveListPage,
  WriteGatheringPage,
  PortfolioListPage,
  WriteArchivePage,
  UserPage,
  RegisterPage,
  SearchPage,
  MyPage,
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
          path: '/my/*',
          element: <MyPage />,
        },
      ],
    },
  ]);
};

export default AppRouter;
