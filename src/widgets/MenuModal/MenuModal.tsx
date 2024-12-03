import { faHeart, faHome, faSearch, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';
import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from './MenuModal.module.scss';
import { NAV_LINKS } from '../Layout/constants';

import { useModalStore } from '@/shared/model/modalStore';
import { Button } from '@/shared/ui';

export const MenuModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: (f: boolean) => void;
}) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const open = useModalStore(state => state.actions.open);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  return (
    <div className={styles.container}>
      <FontAwesomeIcon
        className={styles.close}
        icon={faX}
        onClick={() => {
          onClose(false);
        }}
      />
      <FontAwesomeIcon
        icon={faHome}
        onClick={() => {
          navigate('/');
          onClose(false);
        }}
      />
      <nav className={styles.gnbWrapper}>
        <ul className={styles.gnb}>
          {NAV_LINKS.map((link, idx) => (
            <React.Fragment key={link.path}>
              <li
                onClick={() => {
                  onClose(false);
                }}
              >
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
          onClick={() => {
            navigate('/search');
            onClose(false);
          }}
        />
        <FontAwesomeIcon
          className={cn(styles.button, styles.heart)}
          icon={faHeart}
          onClick={() => {
            navigate('/like');
            onClose(false);
          }}
        />
        <Button
          onClick={() => {
            open('login');
            onClose(false);
          }}
        >
          로그인
        </Button>
      </div>{' '}
    </div>
  );
};