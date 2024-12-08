import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import { ContactBtn } from './ContactBtn';
import styles from './PortfolioCard.module.scss';
import { getJobGroupDisplayName } from '../utils/jobGroupConverter';

import type { Portfolio } from '@/features';
import { usePortfolioView } from '@/features';
import Heart from '@/shared/assets/heart.svg';
import profileImg from '@/shared/assets/paletteLogo.svg';
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

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault(); // 우선 페이지 이동을 막습니다
    incrementView(portFolioId, {
      onSuccess: () => {
        window.location.href = portFolioUrl;
      },
    });
  };
  console.log('relatedUrl', relatedUrl);
  return (
    <div className={styles.container} onClick={handleClick}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <Link className={styles.cardImg} to={portFolioUrl}>
            <img alt={`${username}의 프로필 이미지`} src={memberImageUrl || profileImg} />
          </Link>
          <ContactBtn userName={username} />
        </div>
        <div className={styles.cardFooter}>
          <div className={styles.firstInfo}>
            <span className={styles.name}>{username}</span>
            <button
              onClick={e => {
                e.stopPropagation();
              }}
            >
              <img alt='isLiked-icon' className={styles.heart} src={Heart} />
            </button>
          </div>
          <div className={styles.job}>
            <div>
              <Link to={`/user/${userId}`}>
                <span>{getJobGroupDisplayName(majorJobGroup)}</span>/
              </Link>
              <span>{getJobGroupDisplayName(minorJobGroup)}</span>
            </div>
            <span>@{jobTitle}</span>
          </div>
          <div className={styles.introduction}>{introduction}</div>
          <div className={styles.userLinks}>
            {relatedUrl?.map(link => (
              <a href={link} key={link}>
                <FontAwesomeIcon icon={faLink} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
