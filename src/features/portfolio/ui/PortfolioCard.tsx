import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';
import { Link, useNavigate } from 'react-router-dom';

import { ContactBtn } from './ContactBtn';
import styles from './PortfolioCard.module.scss';

import DefaultProfilImg from '@/shared/assets/paletteLogo.svg?react';

interface PortfolioCardProps {
  portFolioId: number;
  portFolioUrl: string;
  username: string;
  introduction: string;
  majorJobGroup: string;
  minorJobGroup: string;
  memberImageUrl?: string;
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
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <Link className={styles.cardImg} to={portFolioUrl}>
            {memberImageUrl && memberImageUrl.length > 0 ? (
              <img alt={`${username}의 프로필 이미지`} src={memberImageUrl} />
            ) : (
              <DefaultProfilImg height='100%' width='100%' />
            )}
          </Link>
          <ContactBtn userName={username} />
        </div>
        <div className={styles.cardFooter}>
          <div className={styles.firstInfo}>
            <span className={styles.name}>{username}</span>
            <FontAwesomeIcon
              className={cn(styles.button, styles.heart)}
              icon={faHeart}
              onClick={() => {
                navigate('/');
              }}
            />
          </div>
          <div className={styles.job}>
            <div>
              <span>{minorJobGroup}</span>
              <span>@{majorJobGroup}</span>
            </div>
          </div>
          <div className={styles.introduction}>{introduction}</div>
        </div>
      </div>
    </div>
  );
};
