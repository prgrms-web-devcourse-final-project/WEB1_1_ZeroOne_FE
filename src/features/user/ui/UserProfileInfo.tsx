import { faGear, faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

import styles from './UserProfileInfo.module.scss';
import type { User } from '../user.dto';

import { JOB_SUB_CATEGORY } from '@/features/auth';

interface UserProfileInfoProps {
  data: User;
  isMyPage: boolean;
}

export const UserProfileInfo = ({ data, isMyPage }: UserProfileInfoProps) => {
  const { name, briefIntro, imageUrl, minorJobGroup, jobTitle, portfolioLink, socials } = data;
  const navigate = useNavigate();

  return (
    <div className={styles.userProfileWrapper}>
      <div className={styles.profileImage}>
        <img alt='profile-image' src={imageUrl} />
      </div>
      <div className={styles.userInfo}>
        <div className={styles.infoHeader}>
          <strong>{name}</strong>
          {isMyPage && (
            <FontAwesomeIcon
              icon={faGear}
              onClick={() => {
                navigate('/my');
              }}
            />
          )}
        </div>
        <div className={styles.jobInfos}>
          <span>
            {`${JOB_SUB_CATEGORY.find(category => category.value === minorJobGroup)?.label}`}
          </span>
          <span>{`@${jobTitle}`}</span>
        </div>
        <a className={styles.portfolioLink} href={portfolioLink}>
          {portfolioLink}
        </a>
        <div className={styles.introInfoWrapper}>
          <span className={styles.infoTitle}>소개</span>
          <p>{briefIntro}</p>
        </div>

        <div className={styles.userLinks}>
          {socials.map(link => (
            <a className={styles.userLink} href={link} key={link}>
              <FontAwesomeIcon icon={faLink} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
