import cn from 'classnames';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { MYPAGE_TAB } from './hooks/useMyTab';
import styles from './SideTab.module.scss';

import { TripleDot } from '@/shared/ui';

interface SideTapProps {
  isActivePath: (path: string) => boolean;
}

export const SideTab = ({ isActivePath }: SideTapProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {MYPAGE_TAB.map(tab => (
        <ul className={styles.tabListWrapper} key={tab.title}>
          <li>
            <div>
              <span>{tab.title}</span>
              {!isMobile && <TripleDot className={styles.divider} />}
            </div>
          </li>
          {tab.tabList.map(subTab => (
            <li
              className={cn(styles.tabItemWrapper, { [styles.active]: isActivePath(subTab.path) })}
              key={subTab.path}
            >
              <Link to={subTab.path}>{subTab.label}</Link>
            </li>
          ))}
        </ul>
      ))}
    </>
  );
};
