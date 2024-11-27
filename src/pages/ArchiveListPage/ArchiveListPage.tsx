import styles from './ArchiveListPage.module.scss';

import { SelectBtn } from '@/shared/ui';
import { ArchiveGrid } from '@/widgets';

export const ArchiveListPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.selectWrapper}>
        <h2>아카이브 리스트 색상</h2>
        <div className={styles.orderWrapper}>
          <SelectBtn
            options={[
              { label: '최신순', value: 'latest' },
              { label: '인기순', value: 'popular' },
            ]}
            value={{ label: '최신순', value: 'latest' }}
          />
        </div>
      </div>
      <ArchiveGrid />
    </div>
  );
};
