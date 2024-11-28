import styles from './SearchAll.module.scss';

import type { ArchiveCardDTO } from '@/features';
import { ArchiveCard } from '@/features';
import { Button, GatheringCard } from '@/shared/ui';
import type { GatheringCardProps } from '@/shared/ui/GatheringCard';

export const SearchAll = ({
  archives,
  gatherings,
  setActiveTab,
}: {
  archives: ArchiveCardDTO[];
  gatherings: GatheringCardProps[];
  setActiveTab: (t: string) => void;
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.listWrapper}>
        <div className={styles.listHeader}>
          <p className={styles.tab}>아카이브</p>
          <Button
            onClick={() => {
              setActiveTab('아카이브');
            }}
          >
            더보기
          </Button>
        </div>
        <ul className={styles.list}>
          {archives.map(archive => (
            <ArchiveCard archive={archive} key={archive.archiveId} />
          ))}
        </ul>
      </div>
      <div className={styles.listWrapper}>
        <div className={styles.listHeader}>
          <p className={styles.tab}>게더링</p>
          <Button
            onClick={() => {
              setActiveTab('게더링');
            }}
          >
            더보기
          </Button>
        </div>
        <ul className={styles.list}>
          {gatherings.map(gathering => (
            <GatheringCard title={gathering.title} />
          ))}
        </ul>
      </div>
    </div>
  );
};
