import { faGear, faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './UserProfileInfo.module.scss';

export const UserProfileInfo = () => {
  return (
    <div className={styles.userProfileWrapper}>
      <div className={styles.profileImage}>
        <img
          alt='profile-image'
          src='https://api.surfit.io/v1/directory/avatar/350599784?t=1732628475'
        />
      </div>
      <div className={styles.userInfo}>
        <div className={styles.infoHeader}>
          <strong>채승규</strong>
          <FontAwesomeIcon icon={faGear} />
        </div>
        <div className={styles.jobInfos}>
          <span>프론트엔드 개발자</span>
          <span>@Naver</span>
        </div>
        <a className={styles.portfolioLink}>https://notefolio.net/nomonomonomonomonomonomo</a>
        <div className={styles.introInfoWrapper}>
          <span className={styles.infoTitle}>소개</span>
          <p>
            디자인이 정말 좋아서 하고 있는 9년차 UIUX 독립 디자이너의 노모노모 디자인
            스튜디오입니다. UIUX 디자인을 기반으로 활동하지만, 다양한 디자인 분야를 끊임없이
            탐구하고 연구하고 있습니다.
          </p>
        </div>

        <div className={styles.userLinks}>
          <a className={styles.userLink}>
            <FontAwesomeIcon icon={faLink} />
          </a>
          <a className={styles.userLink}>
            <FontAwesomeIcon icon={faLink} />
          </a>
        </div>
      </div>
    </div>
  );
};
