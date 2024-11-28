import { createBrowserRouter } from 'react-router-dom';

import {
  GatheringListPage,
  DetailArchivePage,
  ArchiveListPage,
  WriteGatheringPage,
  WriteArchivePage,
  RegisterPage,
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
          element: <>{/** portfolioPage */}</>,
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
