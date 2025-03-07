import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

import styles from './GatheringListPage.module.scss';

import type {
  GatheringContactType,
  GatheringPeriod,
  GatheringPersonnel,
  GatheringPosition,
  GatheringSortType,
} from '@/features';
import { useInfiniteGatheringId } from '@/features/gathering/lib/hooks/useInfiniteGatheringId';
import { useIntersectionObserver } from '@/shared/hook/useIntersectionObserver';
import { Loader, MobileSidebarFilter, PROJECT_CATEGORIES, SidebarFilter } from '@/shared/ui';
import type { FilterState } from '@/shared/ui/SidebarFilter/types';
import { GatheringGrid, GatheringSelectCon } from '@/widgets';

interface Filters {
  sort?: GatheringSortType;
  subject?: string;
  period?: GatheringPeriod;
  positions?: GatheringPosition[];
  contact?: GatheringContactType;
  personnel?: GatheringPersonnel;
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

export default function GatheringListPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [initialFilterState, setInitialFilterState] = useState<Partial<FilterState>>({});

  const [filters, setFilters] = useState<Filters>({
    sort: '',
  });

  const handleFilterChange = (categoryId: string, subItemId: string | null) => {
    setInitialFilterState({
      selectedCategory: categoryId,
      selectedSubItem: subItemId,
      openCategoryId: categoryId,
    });

    if (categoryId === 'all') {
      setFilters(prev => ({
        ...prev,
        sort: undefined,
        subject: undefined,
      }));
      return;
    }

    if (categoryId in mapCategoryToSort) {
      setFilters(prev => ({
        ...prev,
        sort: mapCategoryToSort[categoryId],
        subject: subItemId ? mapSubItemToSubject[subItemId] : undefined,
      }));
    }
  };

  const handleSelectFilterChange = (newFilters: Partial<Filters>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
    }));
  };

  const { items, isLoading, isError, hasNextPage, isFetchingNextPage, fetchNextPage, refetch } =
    useInfiniteGatheringId({
      size: 12,
      status: '모집중',
      sort: filters.sort,
      subject: filters.subject,
      period: filters.period,
      positions: filters.positions,
      personnel: filters.personnel,
      contact: filters.contact,
    });

  useEffect(() => {
    refetch();
  }, [filters, refetch]);

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

  const onIntersect = async () => {
    if (hasNextPage && !isFetchingNextPage) {
      await fetchNextPage();
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  const observerRef = useIntersectionObserver(onIntersect, {
    threshold: 1,
    rootMargin: '50px',
  });

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <div>
        <Loader />
        데이터를 불러오는데 실패했습니다.
      </div>
    );

  const getCurrentCategoryName = () => {
    if (initialFilterState.selectedCategory === 'all') return '전체';
    const category = PROJECT_CATEGORIES.find(cat => cat.id === initialFilterState.selectedCategory);
    if (!category) return '전체';

    if (initialFilterState.selectedSubItem) {
      const subItem = category.subItems?.find(sub => sub.id === initialFilterState.selectedSubItem);
      return subItem ? subItem.name : category.name;
    }

    return category.name;
  };

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
                  <span>{getCurrentCategoryName()}</span>
                  <FontAwesomeIcon icon={faChevronDown} size='xs' />
                </div>
                {isCategoryOpen && (
                  <MobileSidebarFilter
                    content={
                      <SidebarFilter
                        categories={PROJECT_CATEGORIES}
                        defaultCategory='all'
                        initialState={initialFilterState}
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
                initialState={initialFilterState}
                onFilterChange={handleFilterChange}
              />
            )}
          </aside>
        </div>
        <div className={styles.mainContent}>
          <GatheringSelectCon onFilterChange={handleSelectFilterChange} />
          <GatheringGrid items={items} />
          <div
            ref={observerRef}
            style={{
              height: '20px',
              width: '100%',
              marginTop: '20px',
              visibility: hasNextPage ? 'visible' : 'hidden',
            }}
          >
            {isFetchingNextPage && <Loader />}
          </div>
        </div>
      </div>
    </div>
  );
}
