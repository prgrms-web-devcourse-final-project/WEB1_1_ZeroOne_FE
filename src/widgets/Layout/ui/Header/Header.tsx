import { faBars, faBell, faHeart, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';
import React, { useRef } from 'react';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useShallow } from 'zustand/shallow';

import styles from './Header.module.scss';
import { NAV_LINKS } from '../../constants';

//assets
import { SearchBar } from '@/features';
import { logout } from '@/features/auth/auth.api';
import { useUserStore } from '@/features/user/model/user.store';
import Logo from '@/shared/assets/paletteLogo.svg?react';
import { useModalStore } from '@/shared/model/modalStore';
import { Button, customConfirm } from '@/shared/ui';
import { MenuModal } from '@/widgets/MenuModal/MenuModal';
import { NoticeContainer } from '@/widgets/NoticeContainer/NoticeContainer';

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
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
  const [isSearch, setIsSearch] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1000);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const searchRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (searchRef.current !== null && !searchRef.current.contains(event.target as Node)) {
        setTimeout(() => {
          setIsSearch(false);
        }, 100);
      }
    };
    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, []);

  const toggleSearch = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (!isSearch) setIsSearch(true);
  };

  return (
    <header className={styles.header}>
      {/** Logo */}
      <h1 className={styles.logo}>
        <Link to='/'>
          <Logo height={36} />
        </Link>
        <span>Palettee</span>
      </h1>
      {isMobile ? (
        <>
          <div className={styles.mobileBtns}>
            <FontAwesomeIcon
              className={cn(styles.button, styles.search)}
              icon={faSearch}
              onClick={toggleSearch}
            />
            <FontAwesomeIcon
              className={cn(styles.button, styles.bell)}
              icon={faBell}
              onClick={() => {}}
            />
            <FontAwesomeIcon
              icon={faBars}
              onClick={() => {
                setMenuOpen(true);
              }}
              size='lg'
            />
          </div>
          {isSearch && (
            <div
              className={cn(styles.searchWrapper, { [styles.visible]: isSearch })}
              ref={searchRef}
            >
              <SearchBar isSearch setIsSearch={setIsSearch} />
            </div>
          )}
          {menuOpen && (
            <MenuModal
              isOpen={menuOpen}
              isUserData={userData ? true : false}
              onClose={setMenuOpen}
              onLogout={logoutHandler}
            />
          )}{' '}
        </>
      ) : (
        <>
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
          <div className={styles.userMenu}>
            <FontAwesomeIcon
              className={cn(styles.button, styles.search)}
              icon={faSearch}
              onClick={toggleSearch}
            />
            <FontAwesomeIcon
              className={cn(styles.button, styles.bell)}
              icon={faBell}
              onClick={() => {}}
            />
            <FontAwesomeIcon
              className={cn(styles.button, styles.heart)}
              icon={faHeart}
              onClick={() => {
                if (userData) navigate('/like');
                else {
                  customConfirm({
                    text: '로그인이 필요합니다.',
                    title: '로그인',
                    icon: 'info',
                  }).catch(console.error);
                }
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
          </div>{' '}
          {isSearch && (
            <div
              className={cn(styles.searchWrapper, { [styles.visible]: isSearch })}
              ref={searchRef}
            >
              <SearchBar isSearch setIsSearch={setIsSearch} />
            </div>
          )}
        </>
      )}
      <NoticeContainer />
    </header>
  );
};
