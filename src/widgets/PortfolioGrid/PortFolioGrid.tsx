import styles from './PortFolioGrid.module.scss';

import { PortfolioCard } from '@/features';
import { usePortfolioList } from '@/features/portfolio/hooks/usePortfolioList';
import type { PortfolioParams } from '@/features/portfolio/model/types';
import { useIntersectionObserver } from '@/shared/hook/useIntersectionObserver';
import { TripleDot } from '@/shared/ui';

export const PortFolioGrid = ({ params }: { params: PortfolioParams }) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status, isError } =
    usePortfolioList(params);

  const ref = useIntersectionObserver(
    () => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    { threshold: 1 },
  );

  if (status === 'pending') return <div>Loading...</div>;
  if (isError) return <div>Error loading portfolios</div>;

  const portfolios = data?.pages?.flatMap(page => page?.content ?? []).filter(Boolean) ?? [];

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        {portfolios.length > 0 ? (
          portfolios.map(portfolio => <PortfolioCard key={portfolio.portFolioId} {...portfolio} />)
        ) : (
          <div>검색 결과가 없습니다.</div>
        )}
      </div>

      <div className={styles.loading} ref={ref}>
        {isFetchingNextPage && <TripleDot />}
      </div>
    </div>
  );
};
