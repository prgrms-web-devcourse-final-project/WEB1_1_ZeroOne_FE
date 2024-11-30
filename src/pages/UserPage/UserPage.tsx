import cn from 'classnames';

import styles from './UserPage.module.scss';

import { UserProfileInfo } from '@/features/user';
import { UserContents } from '@/widgets';

export const UserPage = () => {
  return (
    <div className={styles.container}>
      {/** 배너 컴포넌트 분리 예정 */}
      <div className={cn(styles.userBanner, styles['green'])}></div>
      <div className={styles.userSectionWrapper}>
        <div className={styles.userProfileContainer}>
          <UserProfileInfo />
        </div>
        <UserContents />
      </div>
    </div>
  );
};
