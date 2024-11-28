import { useNavigate } from 'react-router-dom';

import styles from './ArchiveListPage.module.scss';

import { ColorSelect } from '@/features';
import { Button, SelectBtn } from '@/shared/ui';
import { ArchiveGrid } from '@/widgets';

export const ArchiveListPage = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.wrapper}>
      <div className={styles.selectWrapper}>
        <h2>아카이브 리스트 색상</h2>
        <div className={styles.orderWrapper}>
          <ColorSelect />
          <div className={styles.buttonWrapper}>
            <SelectBtn
              options={[
                { label: '최신순', value: 'latest' },
                { label: '인기순', value: 'popular' },
              ]}
              value={{ label: '최신순', value: 'latest' }}
            />
            <Button
              onClick={() => {
                navigate('/archive/write');
              }}
            >
              아카이브 만들기
            </Button>
          </div>
        </div>
      </div>
      <ArchiveGrid />
    </div>
  );
};
