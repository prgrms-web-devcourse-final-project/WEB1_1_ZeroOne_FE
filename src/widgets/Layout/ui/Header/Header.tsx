import { faHeart, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useShallow } from 'zustand/shallow';

import styles from './Header.module.scss';
import { NAV_LINKS } from '../../constants';

//assets
import { logout } from '@/features/auth/auth.api';
import { useUserStore } from '@/features/user/model/user.store';
import Logo from '@/shared/assets/paletteLogo.svg?react';
//model
import { useModalStore } from '@/shared/model/modalStore';
//component
import { Button, customConfirm } from '@/shared/ui';

export const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const open = useModalStore(state => state.actions.open);
  const { userData, actions } = useUserStore(
    useShallow(state => ({
      userData: state.userData,
      actions: state.actions,
    })),
  );

  console.log(userData);

  const logoutHandler = async () => {
    await logout();
    actions.setUserData(null);
    await customConfirm({
      title: '로그아웃',
      text: '로그아웃 되었습니다.',
      icon: 'info',
      showCancelButton: false,
    });
  };

  return (
    <header className={styles.header}>
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
            <React.Fragment key={link.path}>
              <li>
                <Link className={pathname === link.path ? styles.active : ''} to={link.path}>
                  {link.title}
                </Link>
              </li>
              {idx < NAV_LINKS.length - 1 && <li className={styles.navDot} />}
            </React.Fragment>
          ))}
        </ul>
      </nav>
      {/** UserMenu */}
      <div className={styles.userMenu}>
        <FontAwesomeIcon
          className={cn(styles.button, styles.search)}
          icon={faSearch}
          onClick={() => {
            navigate('/search');
          }}
        />
        <FontAwesomeIcon
          className={cn(styles.button, styles.heart)}
          icon={faHeart}
          onClick={() => {
            navigate('/like');
          }}
        />
        {userData ? (
          <Button
            onClick={() => {
              void logoutHandler();
            }}
          >
            로그아웃
          </Button>
        ) : (
          <Button
            onClick={() => {
              open('login');
            }}
          >
            로그인
          </Button>
        )}
      </div>
    </header>
  );
};
