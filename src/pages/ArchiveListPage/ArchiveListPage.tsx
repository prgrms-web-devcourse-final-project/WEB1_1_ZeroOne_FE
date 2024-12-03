import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './ArchiveListPage.module.scss';

import type { Color } from '@/features';
import { ColorSelect, useArchiveList } from '@/features';
import { Button, SelectBtn, TripleDot } from '@/shared/ui';
import { ArchiveGrid } from '@/widgets';

export const ArchiveListPage = () => {
  const navigate = useNavigate();
  const [sort, setSort] = useState({ label: '최신순', value: 'latest' });
  const [color, setColor] = useState<Color>('DEFAULT');

  const { items: archives, isFetchingNextPage, ref } = useArchiveList(sort.value, color);

  return (
    <div className={styles.wrapper}>
      <div className={styles.selectWrapper}>
        <h2>아카이브 리스트 색상</h2>
        <div className={styles.orderWrapper}>
          <ColorSelect color={color} setColor={setColor} />
          <div className={styles.buttonWrapper}>
            <SelectBtn
              isClearable={false}
              onChange={newValue => {
                setSort(newValue as { label: string; value: string });
              }}
              options={[
                { label: '최신순', value: 'latest' },
                { label: '인기순', value: 'popular' },
              ]}
              value={sort}
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
      <ArchiveGrid archives={archives} />
      <div className={styles.loading} ref={ref}>
        {isFetchingNextPage && <TripleDot />}
      </div>
    </div>
  );
};
