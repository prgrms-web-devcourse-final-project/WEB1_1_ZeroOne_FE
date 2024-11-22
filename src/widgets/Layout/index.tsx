import { Outlet } from 'react-router-dom';

import { Footer } from './ui/Footer';
import { Header } from './ui/Header';

export const Layout = () => {
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
