import styles from './PortFolioGrid.module.scss';

import { PortfolioCard } from '@/features';
import { usePortfolioList } from '@/features/portfolio/hooks/usePortfolioList';
import type { PortfolioParams } from '@/features/portfolio/model/types';
import { useIntersectionObserver } from '@/shared/hook/useIntersectionObserver';

export const PortFolioGrid = ({ params }: { params: PortfolioParams }) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status, isError } =
    usePortfolioList(params);

  const ref = useIntersectionObserver(
    () => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    { threshold: 0.5 },
  );

  if (status === 'pending') return <div>Loading...</div>;
  if (isError) return <div>Error loading portfolios</div>;

  // 모든 페이지의 content를 하나의 배열로 합침
  const portfolios = data?.pages?.flatMap(page => page?.content ?? []) ?? [];

  if (portfolios.length === 0) return <div>No portfolios found</div>;

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        {portfolios.map(portfolio => (
          <PortfolioCard key={portfolio.portFolioId} {...portfolio} />
        ))}
      </div>
      <div ref={ref}>{isFetchingNextPage && <div>Loading more...</div>}</div>
    </div>
  );
};
