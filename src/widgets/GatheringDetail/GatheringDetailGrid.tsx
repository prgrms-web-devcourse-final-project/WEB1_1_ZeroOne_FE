import styles from './GatheringDetailGrid.module.scss';

import { GatheringInfoItem } from '@/features';

export const GatheringDetailGrid = () => {
  return (
    <ul className={styles.container}>
      <GatheringInfoItem label='sort' value='프로젝트' />
      <GatheringInfoItem label='username' value='홍길동' />
      <GatheringInfoItem label='createTime' value='2024-11-24' />
      <GatheringInfoItem label='subject' value='개발' />
      <GatheringInfoItem label='contact' value='온라인' />
      <GatheringInfoItem label='personnel' value={3} />
      <GatheringInfoItem label='period' value='3개월' />
      <GatheringInfoItem label='deadLine' value='2024-11-24' />
      <GatheringInfoItem label='position' value='개발자' />
      <GatheringInfoItem
        label='gatheringTag'
        value={['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'React Query']}
      />
    </ul>
  );
};
