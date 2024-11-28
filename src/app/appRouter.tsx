import { createBrowserRouter } from 'react-router-dom';

import { GatheringListPage, WriteArchivePage, DetailArchivePage } from '@/pages';
import { RegisterPage } from '@/pages/RegisterPage/RegisterPage';
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
          element: <>{/** archiveListPage */}</>,
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
