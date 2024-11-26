// import cn from 'classnames';

import styles from './GatheringListPage.module.scss';

// import { GatheringGrid } from '@/widgets';
import { GatheringSelectCon, GatheringGrid } from '@/widgets';
export const GatheringListPage = () => {
  return (
    <div>
      {/* 사이드 메뉴 */}
      <div>
        <h1 className={styles.h1}>프로젝트(64)</h1>
        <GatheringSelectCon />
        <GatheringGrid />
      </div>
    </div>
  );
};
