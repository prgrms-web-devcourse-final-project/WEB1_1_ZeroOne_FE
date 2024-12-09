import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';
import { useNavigate } from 'react-router-dom';

import styles from './MainGridItem.module.scss';

import { ArchiveCard, usePopularArchive } from '@/features';
import { MainPortfolioGrid, MainGatheringGrid } from '@/widgets';

export const MainGridItem = ({ type }: { type: string }) => {
  const navigate = useNavigate();

  const { data: archiveData } = usePopularArchive();

  if (type === 'portfolio') {
    return (
      <section className={styles.container}>
        <div className={styles.gridWrapper}>
          <h4
            className={styles.title}
            onClick={() => {
              navigate('/portfolio');
            }}
          >
            인기 포트폴리오 유저를 소개합니다
            <FontAwesomeIcon icon={faChevronRight} size='xs' />
          </h4>
          <MainPortfolioGrid />
        </div>
      </section>
    );
  }

  if (type === 'archive') {
    return (
      <section className={styles.container}>
        <div className={styles.gridWrapper}>
          <h4
            className={cn(styles.title, styles.transformMore)}
            onClick={() => {
              navigate('/archive');
            }}
          >
            인기 아카이빙을 소개합니다
            <FontAwesomeIcon icon={faChevronRight} size='xs' />
          </h4>
          <div className={styles.grid}>
            {archiveData?.data?.archives?.map(archive => (
              <ArchiveCard archive={archive} key={archive.archiveId} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (type === 'gathering') {
    return (
      <section className={styles.container}>
        <div className={styles.gridWrapper}>
          <h4
            className={cn(styles.title, styles.transformMore)}
            onClick={() => {
              navigate('/gathering');
            }}
          >
            현재 모집 중인 게더링
            <FontAwesomeIcon icon={faChevronRight} size='xs' />
          </h4>
          <MainGatheringGrid />
        </div>
      </section>
    );
  }
};
