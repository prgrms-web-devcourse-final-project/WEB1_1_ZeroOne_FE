import { ArchiveGrid } from '../ArchiveGrid';
import styles from './LikeTab.module.scss';

import { GatheringCard, PortfolioCard, useGatheringLikeList, useInfinitePortfolioLikeList, useLikeArchiveList } from '@/features';
import { Loader, TripleDot } from '@/shared/ui';

export const LikeTab = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (t: string) => void;
}) => {
  const tabs = ['포트폴리오', '아카이브', '게더링'];

  // 아카이브 좋아요 목록
  const {
    items: likeArchives,
    isPending: isArchiveLoading,
    isFetchingNextPage: isArchiveFetchingNext,
    ref: archiveRef,
  } = useLikeArchiveList();

  // 포트폴리오 좋아요 목록
  const {
    portfolios,
    isLoading: isPortfolioLoading,
    isFetchingNextPage: isPortfolioFetchingNext,
    ref: portfolioRef,
  } = useInfinitePortfolioLikeList();

  // 게더링 좋아요 목록
  const {
    gatherings,
    isLoading: isGatheringLoading,
    isFetchingNextPage: isGatheringFetchingNext,
    hasNextPage: hasGatheringNextPage,
    fetchNextPage: fetchGatheringNextPage,
  } = useGatheringLikeList();

  const renderingLikeTap = (activeTab: string) => {
    if (activeTab === '포트폴리오') {
      if (!portfolios || isPortfolioLoading) {
        return <Loader />;
      }
      return (
        <>
          <div className={styles.portfolioGrid}>
            {portfolios.map(portfolio => (
              <PortfolioCard key={portfolio.portFolioId} {...portfolio} />
            ))}
          </div>
          <div className={styles.loading} ref={portfolioRef}>
            {isPortfolioFetchingNext && <TripleDot />}
          </div>
        </>
      );
    } else if (activeTab === '아카이브') {
      if (!likeArchives || isArchiveLoading) {
        return <Loader />;
      }
      return (
        <>
          <ArchiveGrid archives={likeArchives} />
          <div className={styles.loading} ref={archiveRef}>
            {isArchiveFetchingNext && <TripleDot />}
          </div>
        </>
      );
    } else if (activeTab === '게더링') {
      if (!gatherings || isGatheringLoading) {
        return <Loader />;
      }
      return (
        <>
          <div className={styles.gatheringGrid}>
            {gatherings.map(gathering => (
              <GatheringCard key={gathering.gatheringId} {...gathering} />
            ))}
          </div>
          {hasGatheringNextPage && (
            <div className={styles.loading} onClick={() => fetchGatheringNextPage()}>
              {isGatheringFetchingNext && <TripleDot />}
            </div>
          )}
        </>
      );
    }
  };

  return (
    <div className={styles.wrapper}>
      <ul className={styles.tabList}>
        {tabs.map(tab => (
          <li
            className={activeTab === tab ? styles.active : ''}
            key={tab}
            onClick={() => {
              setActiveTab(tab);
            }}
          >
            {tab}
          </li>
        ))}
      </ul>
      {renderingLikeTap(activeTab)}
    </div>
  );
};
