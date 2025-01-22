import { faBars, faBell, faHeart, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';
import React, { useRef } from 'react';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useShallow } from 'zustand/shallow';

import styles from './Header.module.scss';
import { NAV_LINKS } from '../../constants';

//assets
import { SearchBar } from '@/features';
import { useNotificationList } from '@/features/notification';
import { useUserStore } from '@/features/user/model/user.store';
import Logo from '@/shared/assets/paletteLogo.svg?react';
import { useModalStore } from '@/shared/model/modalStore';
//componen
import { Button, customConfirm, customToast } from '@/shared/ui';
import { MenuModal } from '@/widgets/MenuModal/MenuModal';
import { NoticeContainer } from '@/widgets/NoticeContainer/NoticeContainer';

export const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const open = useModalStore(state => state.actions.open);
  const { userData, loading } = useUserStore(
    useShallow(state => ({
      userData: state.userData,
      loading: state.loading,
    })),
  );
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const noticeRef = useRef<HTMLDivElement>(null);
  const [isSearch, setIsSearch] = useState(false);
  const [isNotice, setIsNotice] = useState(false);
  const [isNewNotice, setIsNewNotice] = useState(false);

  const { data: notifications, refetch: fetchNotifications } = useNotificationList();

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

  useEffect(() => {
    if (!userData) return;

    const EventSource = EventSourcePolyfill || NativeEventSource;
    const accessToken = localStorage.getItem('accessToken');

    const eventSource = new EventSource(`https://api.palettee.site/notification/subscribe`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ContentType: 'text/event-stream',
        CacheControl: 'no-cache',
        Connection: 'keep-alive',
      },
      heartbeatTimeout: 86400000,
    });

    eventSource.addEventListener('sse', event => {
      const eventSource = event as MessageEvent;
      if (eventSource.data.startsWith('연결되었습니다.')) return;

      void customToast({ text: '새로운 알림이 도착했습니다.', icon: 'info' });

      // 알림창이 켜져있으면 newNotice X
      if (!isNotice) {
        setIsNewNotice(true);
        return;
      }

      if (isNotice) {
        void fetchNotifications();
      }
    });

    fetchNotifications()
      .then(() => {
        const unreadNoti = notifications?.data.notifications.filter(noti => !noti.isRead);
        if (unreadNoti && unreadNoti.length > 0) setIsNewNotice(true);
      })
      .catch(() => {
        void customToast({ text: '알림을 불러오는 중 오류가 발생했습니다.', icon: 'error' });
      });

    return () => {
      eventSource.close();
    };
  }, [userData]);

  useEffect(() => {
    if (!isSearch && !isNotice) return;

    const handleOutsideClick = (event: MouseEvent) => {
      const searchNode = searchRef.current;
      const noticeNode = noticeRef.current;

      if (
        (searchNode && !searchNode.contains(event.target as Node)) ||
        (noticeNode && !noticeNode.contains(event.target as Node))
      ) {
        setTimeout(() => {
          setIsSearch(false);
          setIsNotice(false);
        }, 100);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [searchRef, noticeRef, isSearch, isNotice]);

  const toggleSearch = () => {
    setIsSearch(!isSearch);
    if (isNotice) setIsNotice(false);
  };

  const toggleNoti = () => {
    if (userData) {
      setIsNotice(!isNotice);
    } else {
      void customConfirm({
        text: '로그인이 필요합니다.',
        title: '로그인',
        icon: 'info',
      });
    }
    if (isSearch) setIsSearch(false);
    setIsNewNotice(false);
  };

  return (
    <header className={styles.header}>
      {/** Logo */}
      <h1 className={styles.logo}>
        <Link to='/'>
          <Logo height={36} />
        </Link>
        <span>Palette</span>
      </h1>
      {isMobile ? (
        <>
          <div className={styles.mobileBtns}>
            <FontAwesomeIcon
              className={cn(styles.button, styles.search)}
              icon={faSearch}
              onClick={toggleSearch}
            />
            <div className={cn(styles.bell, { [styles.isNewNotice]: isNewNotice })}>
              <FontAwesomeIcon
                className={cn(styles.button, styles.bell)}
                icon={faBell}
                onClick={toggleNoti}
              />
            </div>
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
          {loading ? (
            <div className={styles.userMenu}></div>
          ) : (
            <div className={styles.userMenu}>
              <FontAwesomeIcon
                className={cn(styles.button, styles.search)}
                icon={faSearch}
                onClick={toggleSearch}
              />
              <div className={cn(styles.bell, { [styles.isNewNotice]: isNewNotice })}>
                <FontAwesomeIcon
                  className={cn(styles.button, styles.bell)}
                  icon={faBell}
                  onClick={toggleNoti}
                />
              </div>
              <FontAwesomeIcon
                className={cn(styles.button, styles.heart)}
                icon={faHeart}
                onClick={() => {
                  if (userData) navigate('/like');
                  else {
                    void customConfirm({
                      text: '로그인이 필요합니다.',
                      title: '로그인',
                      icon: 'info',
                    });
                  }
                }}
              />
              {userData ? (
                <button
                  onClick={() => {
                    navigate(`/user/${userData.userId}`);
                  }}
                >
                  <img alt='user-profile' className={styles.userProfile} src={userData.imageUrl} />
                </button>
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
          )}
          {isSearch && (
            <div className={cn(styles.searchWrapper, { [styles.visible]: isSearch })}>
              <SearchBar isSearch setIsSearch={setIsSearch} />
            </div>
          )}
        </>
      )}
      <div className={styles.notiWrapper} ref={noticeRef}>
        <NoticeContainer isNotice={isNotice} />
      </div>
    </header>
  );
};
