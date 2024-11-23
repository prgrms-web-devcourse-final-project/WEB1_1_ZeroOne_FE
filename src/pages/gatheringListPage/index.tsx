import cn from 'classnames';

import styles from './GatheringListPage.module.scss';

import { GatheringCard } from '@/shared';

export const GatheringListPage = () => {
  return (
    <div className={cn(styles.page)}>
      <GatheringCard
        className='className'
        deadline='2024-12-31'
        introduction='lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. ddsfdsfdsfsdfsdfdsfsdfsdfsdf'
        name='홍길동'
        tag={['tag1', 'tag2', 'tag1', 'tag2', 'tag1', 'tag2']}
        title='title'
      />
    </div>
  );
};

export default GatheringListPage;
