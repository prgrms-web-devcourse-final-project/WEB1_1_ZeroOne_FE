import { lazy, Suspense } from 'react';
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

// import { ArchiveListPage } from '@/pages/ArchiveListPage/ArchiveListPage';
import { MainPage } from '@/pages/MainPage/MainPage';
import { PortfolioListPage } from '@/pages/PortfolioListPage/PortfolioListPage';
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
          element: (
            <Suspense fallback={<LoadingFallback />}>
              <WriteArchivePage />
            </Suspense>
          ),
        },
        {
          path: '/archive/:archiveId',
          element: (
            <Suspense fallback={<LoadingFallback />}>
              <DetailArchivePage />
            </Suspense>
          ),
        },

        // Gathering 관련 페이지 - 지연 로드
        {
          path: '/gathering',
          element: (
            <Suspense fallback={<LoadingFallback />}>
              <GatheringListPage />
            </Suspense>
          ),
        },
        {
          path: '/gathering/write',
          element: (
            <Suspense fallback={<LoadingFallback />}>
              <WriteGatheringPage />
            </Suspense>
          ),
        },
        {
          path: '/gathering/edit/:gatheringId',
          element: (
            <Suspense fallback={<LoadingFallback />}>
              <WriteGatheringPage />
            </Suspense>
          ),
        },
        {
          path: '/gathering/:gatheringId',
          element: (
            <Suspense fallback={<LoadingFallback />}>
              <GatheringDetailPage />
            </Suspense>
          ),
        },

        // 기타 기능 페이지 - 지연 로드
        {
          path: '/search',
          element: (
            <Suspense fallback={<LoadingFallback />}>
              <SearchPage />
            </Suspense>
          ),
        },

        // 사용자 관련 페이지 - 지연 로드
        {
          path: '/user/:userId',
          element: (
            <Suspense fallback={<LoadingFallback />}>
              <UserPageWrapper />
            </Suspense>
          ),
        },
        {
          path: '/register',
          element: (
            <Suspense fallback={<LoadingFallback />}>
              <RegisterPage />
            </Suspense>
          ),
        },
        {
          path: '/my/*',
          element: (
            <Suspense fallback={<LoadingFallback />}>
              <MyPage />
            </Suspense>
          ),
        },
        {
          path: '/like',
          element: (
            <Suspense fallback={<LoadingFallback />}>
              <LikeListPage />
            </Suspense>
          ),
        },
        {
          path: '/login',
          element: (
            <Suspense fallback={<LoadingFallback />}>
              <LoginLoading />
            </Suspense>
          ),
        },
      ],
    },
  ]);
};

export default AppRouter;
