import { Link } from 'react-router-dom';

import { ContactBtn } from './ContactBtn';
import styles from './PortfolioCard.module.scss';

import profileImg from '@/shared/assets/paletteLogo.svg';

interface PortfolioCardProps {
  portFolioId: number;
  portFolioUrl: string;
  username: string;
  introduction: string;
  majorJobGroup: string;
  minorJobGroup: string;
  memberImageUrl: string;
}

export const PortfolioCard = ({
  // portFolioId,
  portFolioUrl,
  username,
  introduction,
  majorJobGroup,
  minorJobGroup,
  memberImageUrl,
}: PortfolioCardProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <Link className={styles.cardImg} to={portFolioUrl}>
            <img
              alt={`${username}의 프로필 이미지`}
              src={memberImageUrl || profileImg} // 이미지가 없을 경우 기본 이미지 사용
            />
          </Link>
          <ContactBtn userName = {username}/>
        </div>
        <div className={styles.cardFooter}>
          <div className={styles.firstInfo}>
            <span className={styles.name}>{username}</span>
            <span className={styles.heart}>♥</span>
          </div>
          <div className={styles.job}>
            <div>
              <span>{minorJobGroup}</span>
              <span>@{majorJobGroup}</span>
            </div>
            <div>대표 색</div>
          </div>
          <div className={styles.introduction}>{introduction}</div>
        </div>
      </div>
    </div>
  );
};
