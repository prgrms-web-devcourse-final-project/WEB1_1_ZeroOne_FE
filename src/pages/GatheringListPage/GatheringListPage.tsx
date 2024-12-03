// GatheringListPage.tsx
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

import styles from './GatheringListPage.module.scss';

import { useGatheringList } from '@/features/gathering/lib/hooks/useGatheringList';
import { SidebarFilter, PROJECT_CATEGORIES, MobileSidebarFilter } from '@/shared/ui';
import { GatheringSelectCon, GatheringGrid } from '@/widgets';

export const GatheringListPage = () => {
  // 현재는 '모집중' 상태만 가져오도록 구현
  const { items, isLoading, isError, ref, isFetchingNextPage } = useGatheringList('모집중');
  const [isMobile, setIsMobile] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  // 모바일 반응형 처리를 위한 useEffect
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

  // 로딩 및 에러 상태 처리
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading gatherings</div>;

  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.h1}>프로젝트</h1>
      <div className={styles.contentContainer}>
        <div className={styles.sidebarWrapper}>
          <aside className={styles.sidebarContainer}>
            {isMobile ? (
              // 모바일용 사이드바
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
              // 데스크톱용 사이드바
              <SidebarFilter categories={PROJECT_CATEGORIES} />
            )}
          </aside>
        </div>
        <div className={styles.mainContent}>
          <GatheringSelectCon />
          <GatheringGrid items={items} />
          {/* 무한 스크롤을 위한 관찰 대상 div */}
          <div className={styles.loading} ref={ref}>
            {isFetchingNextPage && <div>Loading more...</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GatheringListPage;
