import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { MainPage, PortfolioListPage, ArchiveListPage } from '@/pages';
import { Layout } from '@/widgets';

// 1. 핵심 페이지는 즉시 로드 (초기 번들에 포함)

// 2. 지연 로딩 페이지 컴포넌트
// 네임드 익스포트를 처리하기 위한 방식 사용
const DetailArchivePage = lazy(() =>
  import('@/pages').then(module => ({ default: module.DetailArchivePage })),
);

const WriteArchivePage = lazy(() =>
  import('@/pages').then(module => ({ default: module.WriteArchivePage })),
);

const GatheringListPage = lazy(() =>
  import('@/pages').then(module => ({ default: module.GatheringListPage })),
);

const GatheringDetailPage = lazy(() =>
  import('@/pages').then(module => ({ default: module.GatheringDetailPage })),
);

const WriteGatheringPage = lazy(() =>
  import('@/pages').then(module => ({ default: module.WriteGatheringPage })),
);

const SearchPage = lazy(() => import('@/pages').then(module => ({ default: module.SearchPage })));

const UserPageWrapper = lazy(() =>
  import('@/pages').then(module => ({ default: module.UserPageWrapper })),
);

const MyPage = lazy(() => import('@/pages').then(module => ({ default: module.MyPage })));

const LikeListPage = lazy(() =>
  import('@/pages').then(module => ({ default: module.LikeListPage })),
);

const RegisterPage = lazy(() =>
  import('@/pages').then(module => ({ default: module.RegisterPage })),
);

// 네임드 익스포트 처리
const LoginLoading = lazy(() =>
  import('@/features/auth/ui/LoginLoading').then(module => ({
    default: module.LoginLoading,
  })),
);

const AppRouter = () => {
  return createBrowserRouter([
    {
      element: <Layout />,
      children: [
        // 핵심 페이지 - 즉시 로드
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

        // Archive 관련 페이지 - 지연 로드
        {
          path: '/archive/write',
          element: <WriteArchivePage />,
        },
        {
          path: '/archive/:archiveId',
          element: <DetailArchivePage />,
        },

        // Gathering 관련 페이지 - 지연 로드
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
          element: <WriteGatheringPage />,
        },
        {
          path: '/gathering/:gatheringId',
          element: <GatheringDetailPage />,
        },

        // 기타 기능 페이지 - 지연 로드
        {
          path: '/search',
          element: <SearchPage />,
        },

        // 사용자 관련 페이지 - 지연 로드
        {
          path: '/user/:userId',
          element: <UserPageWrapper />,
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
