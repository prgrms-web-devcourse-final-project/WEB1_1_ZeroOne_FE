import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './PortfolioListPage.module.scss';

import { JOB_CATEGORIES } from '@/shared/model';
import { MobileSidebarFilter, SidebarFilter } from '@/shared/ui';
import { Button, SelectBtn } from '@/shared/ui';
import { PortFolioGrid } from '@/widgets';
export const PortfolioListPage = () => {
  const navigate = useNavigate();
  const [sort, setSort] = useState({ label: '최신순', value: 'latest' });

  const [isMobile, setIsMobile] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.h1}>포트폴리오</h1>

      <div className={styles.contentContainer}>
        <div className={styles.sidebarWrapper}>
          <aside className={styles.sidebarContainer}>
            {isMobile ? (
              <>
                <div
                  className={styles.categoryOpenBtn}
                  onClick={() => {
                    setIsCategoryOpen(true);
                  }}
                >
                  <span>전체</span>
                  <FontAwesomeIcon icon={faChevronDown} size='xs' />
                </div>
                {isCategoryOpen && (
                  <MobileSidebarFilter
                    content={<SidebarFilter categories={JOB_CATEGORIES} />}
                    isOpen={isCategoryOpen}
                    onClose={() => {
                      setIsCategoryOpen(false);
                    }}
                  />
                )}
              </>
            ) : (
              <SidebarFilter categories={JOB_CATEGORIES} />
            )}
          </aside>
        </div>
        <div className={styles.mainContent}>
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
                navigate('/');
              }}
            >
              포트폴리오 등록하기
            </Button>
          </div>
          <PortFolioGrid />
        </div>
      </div>
    </div>
  );
};
