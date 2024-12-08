import styles from './PortFolioGrid.module.scss';

import { PortfolioCard } from '@/features';
import { usePortfolioList } from '@/features/portfolio/hooks/usePortfolioList';
import type { PortfolioParams } from '@/features/portfolio/model/types';
import { useIntersectionObserver } from '@/shared/hook/useIntersectionObserver';
import { Loader } from '@/shared/ui';

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

  const portfolios = data?.pages?.flatMap(page => page.content) ?? [];

  if (portfolios.length === 0) {
    return (
      <div>
        <Loader />
        검색된 내용이 없습니다.
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        {portfolios.map(portfolio => (
          <PortfolioCard key={portfolio.portFolioId} {...portfolio} />
        ))}
      </div>
      <div
        ref={ref}
        style={{
          width: '100%',
          height: '100px',
          marginTop: '20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {isFetchingNextPage ? (
          <div>
            <Loader />
          </div>
        ) : hasNextPage ? (
          <div style={{ visibility: 'hidden' }}>Intersection Observer Trigger</div>
        ) : null}
      </div>
    </div>
  );
};
