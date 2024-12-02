import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './PortfolioListPage.module.scss';

import { SidebarFilter, JOB_CATEGORIES, Button, SelectBtn } from '@/shared';
import { PortFolioGrid } from '@/widgets';

export const PortfolioListPage = () => {
  const navigate = useNavigate();
  const [sort, setSort] = useState({ label: '최신순', value: 'latest' });

  return (
    <section className={styles.pageWrapper}>
      <h1 className={styles.h1}>포트폴리오</h1>

      <section className={styles.contentContainer}>
        <section className={styles.sidebarWrapper}>
          <aside className={styles.sidebarContainer}>
            <SidebarFilter categories={JOB_CATEGORIES} />
          </aside>
        </section>

        <section className={styles.mainContent}>
          <section className={styles.buttonWrapper}>
            {/* 최신순 인기순 셀렉 버튼 */}
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
                navigate('/user');
              }}
            >
              포트폴리오 등록하기
            </Button>
          </section>
          {/* 포트폴리오 리스트 */}
          <PortFolioGrid />
        </section>
      </section>
    </section>
  );
};
