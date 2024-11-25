import cn from 'classnames';

import styles from './GatheringListPage.module.scss';

import { GatheringGrid } from '@/widgets';

export const GatheringListPage = () => {
  return (
    <div className={cn(styles.page)}>
      <GatheringGrid />
    </div>
  );
};
