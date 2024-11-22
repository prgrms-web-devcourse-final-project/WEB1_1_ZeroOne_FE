import { Link, useLocation } from 'react-router-dom';

import styles from './index.module.scss';
import { NAV_LINKS } from '../../constants';

//assets
import Logo from '@/shared/assets/paletteLogo.svg?react';
import SearchIcon from '@/shared/assets/search.svg?react';
//component
import { Button } from '@/shared/ui';

export const Header = () => {
  const { pathname } = useLocation();

  return (
    <div className={styles.header}>
      {/** Logo */}
      <h1 className={styles.logo}>
        <Link to='/'>
          <Logo height={60} width={52} />
        </Link>
        <span>Palette</span>
      </h1>
      {/** Gnb */}
      <nav className={styles.gnbWrapper}>
        <ul className={styles.gnb}>
          {NAV_LINKS.map((link, idx) => (
            <>
              <li key={link.path}>
                <Link className={pathname === link.path ? styles.active : ''} to={link.path}>
                  {link.title}
                </Link>
              </li>
              {idx < NAV_LINKS.length - 1 && <li className={styles.navDot} />}
            </>
          ))}
        </ul>
      </nav>
      {/** UserMenu */}
      <div className={styles.userMenu}>
        <SearchIcon height={31} width={31} />
        <Button>로그인</Button>
        <Button>회원가입</Button>
      </div>
    </div>
  );
};
