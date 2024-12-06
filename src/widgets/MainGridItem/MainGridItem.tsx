import styles from './MainGridItem.module.scss';

import type { ArchiveCardDTO } from '@/features';
import { ArchiveCard } from '@/features';

const dummyArchive: ArchiveCardDTO = {
  archiveId: 1,
  title: 'string',
  introduction: 'string',
  type: 'RED',
  likeCount: 2,
  username: 'string',
  imageUrl: 'string',
  createDate: 'string',
  isLiked: true,
};

export const MainGridItem = ({ type }: { type: string }) => {
  if (type === 'portfolio') {
    return (
      <section className={styles.container}>
        <h4>인기 포트폴리오 유저를 소개합니다</h4>
        <div className={styles.gridWrapper}>
          <div className={styles.grid}>
            <ArchiveCard archive={dummyArchive} />
            <ArchiveCard archive={dummyArchive} />
            <ArchiveCard archive={dummyArchive} />
            <ArchiveCard archive={dummyArchive} />
          </div>
        </div>
      </section>
    );
  }

  if (type === 'archive') {
    return (
      <section className={styles.container}>
        <h4>인기 아카이빙을 소개합니다</h4>
        <div className={styles.gridWrapper}>
          <div className={styles.grid}>
            <ArchiveCard archive={dummyArchive} />
            <ArchiveCard archive={dummyArchive} />
            <ArchiveCard archive={dummyArchive} />
            <ArchiveCard archive={dummyArchive} />
          </div>
        </div>
      </section>
    );
  }

  if (type === 'gathering') {
    return (
      <section className={styles.container}>
        <h4>현재 모집 중인 게더링</h4>
        <div className={styles.gridWrapper}>
          <div className={styles.grid}>
            <ArchiveCard archive={dummyArchive} />
            <ArchiveCard archive={dummyArchive} />
            <ArchiveCard archive={dummyArchive} />
            <ArchiveCard archive={dummyArchive} />
          </div>
        </div>
      </section>
    );
  }
};
