import styles from './ArchiveListPage.module.scss';

import { ArchiveGrid } from '@/widgets';

export const ArchiveListPage = () => {
  return (
    <div className={styles.wrapper}>
      <ArchiveGrid />
    </div>
  );
};
