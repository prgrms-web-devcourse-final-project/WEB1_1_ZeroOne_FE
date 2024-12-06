import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

import styles from './MainGridItem.module.scss';

import type { ArchiveCardDTO } from '@/features';
import { ArchiveCard, PortfolioCard } from '@/features';
import { GatheringCard } from '@/shared/ui';

const dummyArchive: ArchiveCardDTO = {
  archiveId: 1,
  title: 'string',
  introduction: 'string',
  type: 'RED',
  likeCount: 2,
  username: 'string',
  imageUrl: 'string',
  createDate: 'string',
  isLiked: true,
};

export const MainGridItem = ({ type }: { type: string }) => {
  const navigate = useNavigate();
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
          <div className={styles.grid}>
            <PortfolioCard
              introduction=''
              majorJobGroup=''
              memberImageUrl=''
              minorJobGroup=''
              portFolioId={1}
              portFolioUrl=''
              username=''
            />
            <PortfolioCard
              introduction=''
              majorJobGroup=''
              memberImageUrl=''
              minorJobGroup=''
              portFolioId={2}
              portFolioUrl=''
              username=''
            />
            <PortfolioCard
              introduction=''
              majorJobGroup=''
              memberImageUrl=''
              minorJobGroup=''
              portFolioId={3}
              portFolioUrl=''
              username=''
            />
            <PortfolioCard
              introduction=''
              majorJobGroup=''
              memberImageUrl=''
              minorJobGroup=''
              portFolioId={4}
              portFolioUrl=''
              username=''
            />
          </div>
        </div>
      </section>
    );
  }

  if (type === 'archive') {
    return (
      <section className={styles.container}>
        <div className={styles.gridWrapper}>
          <h4
            className={styles.title}
            onClick={() => {
              navigate('/archive');
            }}
          >
            인기 아카이빙을 소개합니다
            <FontAwesomeIcon icon={faChevronRight} size='xs' />
          </h4>
          <div className={styles.grid}>
            <ArchiveCard archive={dummyArchive} />
            <ArchiveCard archive={dummyArchive} />
            <ArchiveCard archive={dummyArchive} />
            <ArchiveCard archive={dummyArchive} />
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
            className={styles.title}
            onClick={() => {
              navigate('/gathering');
            }}
          >
            현재 모집 중인 게더링
            <FontAwesomeIcon icon={faChevronRight} size='xs' />
          </h4>
          <div className={styles.grid}>
            <GatheringCard title='' />
            <GatheringCard title='' />
            <GatheringCard title='' />
            <GatheringCard title='' />
          </div>
        </div>
      </section>
    );
  }
};
