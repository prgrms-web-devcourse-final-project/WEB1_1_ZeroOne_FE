import cn from 'classnames';
import { Link } from 'react-router-dom';

import { MYPAGE_TAB } from './hooks/useMyTab';
import styles from './SideTab.module.scss';

import { TripleDot } from '@/shared/ui';

interface SideTapProps {
  isActivePath: (path: string) => boolean;
}

export const SideTab = ({ isActivePath }: SideTapProps) => {
  return (
    <>
      {MYPAGE_TAB.map(tab => (
        <ul className={styles.tabListWrapper} key={tab.title}>
          <li>
            <div>
              <span>{tab.title}</span>
              <TripleDot className={styles.divider} />
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
