import styles from './MainPortfolioGrid.module.scss';

import { useMainPortfolioList, PortfolioCard } from '@/features';
import { Loader, TripleDot } from '@/shared/ui';

export const MainPortfolioGrid = () => {
  const { data, isLoading, isError } = useMainPortfolioList();
  // console.log(data);

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <div>
        <Loader />
        에러가 발생했습니다.
      </div>
    );

  // 데이터가 없는 경우
  if (!data?.data?.portfolioResponses || data.data.portfolioResponses.length === 0) {
    return (
      <div>
        <TripleDot />
        검색된 내용이 없습니다.
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {data.data.portfolioResponses.map(portfolio => (
        <PortfolioCard key={portfolio.portFolioId} {...portfolio} />
      ))}
    </div>
  );
};
