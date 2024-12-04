import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

import styles from './GatheringListPage.module.scss';

import type { GatheringSortType } from '@/features';
import { useGatheringList } from '@/features';
import { SidebarFilter, PROJECT_CATEGORIES, MobileSidebarFilter, TripleDot } from '@/shared/ui';
import { GatheringSelectCon, GatheringGrid } from '@/widgets';

interface Filters {
  sort?: GatheringSortType;
  subject?: string;
}

const mapCategoryToSort: Record<string, GatheringSortType> = {
  project: '프로젝트',
  study: '스터디',
  club: '동아리',
  etc: '기타',
};

const mapSubItemToSubject: Record<string, string> = {
  dev: '개발',
  design: '디자인',
  planning: '기획',
  startup: '창업',
  marketing: '마케팅',
  language: '어학',
  hobby: '취미',
  social: '친목',
  etc: '기타',
};

export const GatheringListPage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const [filters, setFilters] = useState<Filters>({
    sort: '프로젝트',
    subject: undefined,
  });

  const handleFilterChange = (categoryId: string, subItemId: string | null) => {
    // 전체 카테고리 선택시
    if (categoryId === 'all') {
      setFilters({
        sort: undefined,
        subject: undefined,
      });
      return;
    }

    // 메인 카테고리 선택시 (프로젝트, 스터디, 동아리, 기타)
    if (categoryId in mapCategoryToSort) {
      setFilters(prev => ({
        sort: mapCategoryToSort[categoryId],
        subject: undefined, // 메인 카테고리 변경시 서브 카테고리 초기화
      }));
    }

    // 서브 카테고리 선택시
    if (subItemId && subItemId in mapSubItemToSubject) {
      setFilters(prev => ({
        ...prev,
        subject: mapSubItemToSubject[subItemId],
      }));
    }
  };

  const { items, isLoading, isError, ref, isFetchingNextPage } = useGatheringList({
    status: '모집중',
    pageSize: 12,
    ...filters,
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
                    content={
                      <SidebarFilter
                        categories={PROJECT_CATEGORIES}
                        defaultCategory='all'
                        onFilterChange={handleFilterChange}
                      />
                    }
                    isOpen={isCategoryOpen}
                    onClose={() => {
                      setIsCategoryOpen(false);
                    }}
                  />
                )}
              </>
            ) : (
              <SidebarFilter
                categories={PROJECT_CATEGORIES}
                defaultCategory='all'
                onFilterChange={handleFilterChange}
              />
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
