import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

import styles from './GatheringListPage.module.scss';

import { useGatheringList } from '@/features/gathering/lib/hooks/useGatheringList';
import { SidebarFilter, PROJECT_CATEGORIES, MobileSidebarFilter, TripleDot } from '@/shared/ui';
import { GatheringSelectCon, GatheringGrid } from '@/widgets';

export const GatheringListPage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const { items, isLoading, isError, ref, isFetchingNextPage } = useGatheringList({
    status: '모집중',
    pageSize: 12,
  });

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
  console.log(items);

  if (isLoading) return <TripleDot />;

  if (isError) return <div>Error loading gatherings</div>;

  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.h1}>프로젝트</h1>
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
                    content={<SidebarFilter categories={PROJECT_CATEGORIES} />}
                    isOpen={isCategoryOpen}
                    onClose={() => {
                      setIsCategoryOpen(false);
                    }}
                  />
                )}
              </>
            ) : (
              <SidebarFilter categories={PROJECT_CATEGORIES} />
            )}
          </aside>
        </div>
        <div className={styles.mainContent}>
          <GatheringSelectCon />
          <GatheringGrid items={items} />
          <div className={styles.loading} ref={ref}>
            {isFetchingNextPage && <TripleDot />}
          </div>
        </div>
      </div>
    </div>
  );
};
