import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import { ContactBtn } from './ContactBtn';
import styles from './PortfolioCard.module.scss';
import { getJobGroupDisplayName } from '../utils/jobGroupConverter';

import type { Portfolio } from '@/features';
import { usePortfolioView, usePortfolioLike } from '@/features';
import profileImg from '@/shared/assets/paletteLogo.svg';
import { LikeBtn } from '@/shared/ui/LikeBtn/LikeBtn';

type PortfolioCardProps = Portfolio;

export const PortfolioCard = ({
  portFolioId,
  portFolioUrl,
  username,
  introduction,
  majorJobGroup,
  minorJobGroup,
  memberImageUrl,
  jobTitle,
  userId,
  relatedUrl,
}: PortfolioCardProps) => {
  const { mutate: incrementView } = usePortfolioView({
    onSuccess: response => {
      console.log('조회수 증가 성공:', response.data);
    },
    onError: error => {
      console.error('조회수 증가 실패:', error);
    },
  });

  const { isLiked, toggleLike, isPending } = usePortfolioLike({
    portFolioId,
  });

  const handleCardClick = (e: React.MouseEvent) => {
    const clickedElement = e.target as HTMLElement;
    if (
      clickedElement.closest('button') ||
      clickedElement.closest('a') ||
      clickedElement.closest(`.${styles.userLinks}`)
    ) {
      e.stopPropagation();
      return;
    }

    incrementView(portFolioId, {
      onSuccess: () => {
        window.location.href = portFolioUrl;
      },
    });
  };

  const formatUrl = (url: string) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return `https://${url}`;
  };

  return (
    <div className={styles.container} onClick={handleCardClick}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <Link className={styles.cardImg} to={portFolioUrl}>
            <img alt={`${username}의 프로필 이미지`} src={memberImageUrl || profileImg} />
          </Link>
          <ContactBtn userName={username} />
        </div>
        <div className={styles.cardFooter}>
          <div className={styles.firstInfo}>
            <Link to={`/user/${userId}`}>
              <span className={styles.name}>{username}</span>
            </Link>
            <LikeBtn
              disabled={isPending}
              heartClassName={styles.heart}
              isLiked={isLiked}
              onLikeClick={() => {
                toggleLike();
              }}
            />
          </div>
          <div className={styles.job}>
            <div>
              <Link to={`/user/${userId}`}>
                <span>{getJobGroupDisplayName(majorJobGroup)}</span>/
                <span>{getJobGroupDisplayName(minorJobGroup)}</span>
              </Link>
            </div>
            <span>@{jobTitle}</span>
          </div>
          <div className={styles.introduction}>{introduction}</div>
          <div className={styles.userLinks}>
            {relatedUrl?.map(link => (
              <a
                href={formatUrl(link)}
                key={link}
                onClick={e => {
                  e.stopPropagation();
                }}
                rel='noopener noreferrer'
                target='_blank'
              >
                <FontAwesomeIcon icon={faLink} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
