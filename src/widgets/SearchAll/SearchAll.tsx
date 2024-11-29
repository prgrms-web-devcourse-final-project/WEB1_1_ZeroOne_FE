import { useNavigate } from 'react-router-dom';

import styles from './SearchAll.module.scss';

import { ArchiveCard } from '@/features';
import type { ArchiveCardDTO } from '@/features';
import type { GatheringCardProps } from '@/features/gathering/ui/GatheringCard/GatheringCard';
import { Button, GatheringCard } from '@/shared/ui';

export const SearchAll = ({
  archives,
  gatherings,
  setActiveTab,
}: {
  archives: ArchiveCardDTO[];
  gatherings: GatheringCardProps[];
  setActiveTab: (t: string) => void;
}) => {
  const navigate = useNavigate();
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
            <div
              onClick={() => {
                navigate(`/archive/${archive.archiveId}`);
              }}
            >
              <ArchiveCard archive={archive} key={archive.archiveId} />
            </div>
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
            <div
              onClick={() => {
                navigate(`/gathering/1`);
              }}
            >
              <GatheringCard title={gathering.title} />
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};
