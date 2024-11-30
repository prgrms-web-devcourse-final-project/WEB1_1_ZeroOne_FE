import cn from 'classnames';

import styles from './ContentsTab.module.scss';
import type { tabType } from './model/tab.type';
import { TAB_LIST } from './model/tab.type';

import { TripleDot } from '@/shared/ui';

interface ContentsTabProps {
  setActiveTab: (tab: tabType) => void;
  isActive: (value: tabType) => boolean;
}

export const ContentsTab = ({ setActiveTab, isActive }: ContentsTabProps) => {
  return (
    <div className={styles.contentsTab}>
      {TAB_LIST.map(tab => (
        <div key={tab.value}>
          <button
            className={cn({ [styles.activeTab]: isActive(tab.value) })}
            onClick={() => {
              setActiveTab(tab.value);
            }}
          >
            {tab.name}
          </button>
          {isActive(tab.value) && <TripleDot />}
        </div>
      ))}
    </div>
  );
};
