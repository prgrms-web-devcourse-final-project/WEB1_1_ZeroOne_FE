import { createBrowserRouter } from 'react-router-dom';

import { LoginLoading } from '@/features/auth/ui/LoginLoading';
import {
  ArchiveListPage,
  DetailArchivePage,
  GatheringDetailPage,
  GatheringListPage,
  PortfolioListPage,
  RegisterPage,
  SearchPage,
  MyPage,
  UserPage,
  WriteArchivePage,
  WriteGatheringPage,
  LikeListPage,
  MainPage,
} from '@/pages';
import { Layout } from '@/widgets';

const AppRouter = () => {
  return createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <MainPage />,
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
          path: '/gathering/edit/:gatheringId',
          element: <WriteGatheringPage/>,
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
          path: '/my/*',
          element: <MyPage />,
        },
        {
          path: '/like',
          element: <LikeListPage />,
        },
        {
          path: '/login',
          element: <LoginLoading />,
        },
      ],
    },
  ]);
};

export default AppRouter;
