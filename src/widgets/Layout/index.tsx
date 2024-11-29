import { Outlet } from 'react-router-dom';

import { Footer } from './ui/Footer/Footer';
import { Header } from './ui/Header/Header';

import { useArchiveStore } from '@/features';
import { usePageLifecycle } from '@/shared/hook';

export const Layout = () => {
  const { resetArchiveData, clearStorage } = useArchiveStore();

  usePageLifecycle({
    onNavigate: () => {
      resetArchiveData();
      clearStorage();
    },
  });

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
