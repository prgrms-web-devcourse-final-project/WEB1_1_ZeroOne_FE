import { useNavigate } from 'react-router-dom';

import styles from './ArchiveGrid.module.scss';

import type { ArchiveCardDTO } from '@/features';
import { ArchiveCard } from '@/features';
import { NoResult } from '@/shared/ui';

export const ArchiveGrid = ({ archives }: { archives: ArchiveCardDTO[] }) => {
  const navigate = useNavigate();

  if (archives.length === 0 || !archives) {
    return <NoResult />;
  }

  return (
    <div className={styles.wrapper}>
      {archives.map(archive => (
        <div
          className={styles.item}
          key={archive.archiveId}
          onClick={() => {
            navigate(`/archive/${archive.archiveId}`);
          }}
        >
          <ArchiveCard archive={archive} />
        </div>
      ))}
    </div>
  );
};
