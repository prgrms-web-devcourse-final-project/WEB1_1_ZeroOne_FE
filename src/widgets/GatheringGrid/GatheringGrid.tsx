import styles from './GatheringGrid.module.scss';

import { GatheringCard } from '@/shared';
export const GatheringGrid = () => {
  return (
    <ul className={styles.list}>
      <GatheringCard
        deadline='deadline'
        introduction='introduction'
        name='name'
        tag={['tag1', 'tag2']}
        title='title'
      />
      <GatheringCard
        deadline='deadline'
        introduction='introduction'
        name='name'
        tag={['tag1', 'tag2']}
        title='title'
      />
      <GatheringCard
        deadline='deadline'
        introduction='introduction'
        name='name'
        tag={['tag1', 'tag2']}
        title='title'
      />
    </ul>
  );
};
