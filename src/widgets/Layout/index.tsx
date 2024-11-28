import cn from 'classnames';
import { Outlet, useLocation } from 'react-router-dom';

//constant
import { NO_PAD_ROUTES } from './constants';
//style
import styles from './Layout.module.scss';
//component
import { Footer } from './ui/Footer/Footer';
import { Header } from './ui/Header/Header';

export const Layout = () => {
  const { pathname } = useLocation();
  const isNoPadHeader = NO_PAD_ROUTES.includes(pathname);

  return (
    <>
      <Header />
      <main className={cn({ [styles.noPadding]: isNoPadHeader })}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
