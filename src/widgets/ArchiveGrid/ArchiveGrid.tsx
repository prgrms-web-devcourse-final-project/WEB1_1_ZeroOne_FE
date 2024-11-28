import styles from './ArchiveGrid.module.scss';

import type { ArchiveCardDTO } from '@/features';
import { ArchiveCard } from '@/features';

const dummyArchive: ArchiveCardDTO = {
  archiveId: 1,
  title: '아카이브 제목',
  type: 'red',
  isLiked: false,
  likeCount: 10,
  username: '홍길동',
  thumbnail: 'https://picsum.photos/300/200',
  createDate: new Date(),
  introduction:
    '아카이브 한 줄 소개 ~~~~아카이브 한 줄 소개 ~~~~아카이브 한 줄 소개 ~~~~아카이브 한 줄 소개 ~~~~아카이브 한 줄 소개 ~~~~',
};

export const ArchiveGrid = () => {
  return (
    <div className={styles.wrapper}>
      {Array.from({ length: 20 }, (_, index) => (
        <div className={styles.item} key={index}>
          <ArchiveCard archive={dummyArchive} />
        </div>
      ))}
    </div>
  );
};
