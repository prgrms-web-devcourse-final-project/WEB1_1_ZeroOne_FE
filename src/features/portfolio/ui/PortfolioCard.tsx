import { Link } from 'react-router-dom';

import { ContactBtn } from './ContactBtn';
import styles from './PortfolioCard.module.scss';
import { getJobGroupDisplayName } from '../utils/jobGroupConverter';

import type { Portfolio } from '@/features';
import Heart from '@/shared/assets/heart.svg';
import profileImg from '@/shared/assets/paletteLogo.svg';
type PortfolioCardProps = Portfolio;

export const PortfolioCard = ({
  portFolioUrl,
  username,
  introduction,
  majorJobGroup,
  minorJobGroup,
  memberImageUrl,
  jobTitle,
  userId,
}: PortfolioCardProps) => {
  return (
    <div className={styles.container}>
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
              onClick={(e) => {
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
        </div>
      </div>
    </div>
  );
};
