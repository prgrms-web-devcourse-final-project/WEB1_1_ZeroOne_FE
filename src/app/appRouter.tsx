import { createBrowserRouter } from 'react-router-dom';

const appRouter = () => {
  return createBrowserRouter([
    {
      element: <>{/** baselayout */}</>,
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
          element: <>{/** archivePage */}</>,
        },
        {
          path: '/gathering',
          element: <>{/** gatheringPage */}</>,
        },
        {
          path: '/user',
          element: <>{/** userPage */}</>,
        },
      ],
    },
  ]);
};

export default appRouter;
