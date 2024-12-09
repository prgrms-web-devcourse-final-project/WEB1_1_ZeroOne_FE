import styles from './GatheringDetailUserInfo.module.scss';

import Logo from '@/shared/assets/paletteLogo.svg?react';
interface GatheringDetailUserInfoProps {
  username: string;
  position?: string;
  profileImage?: string;
}

export const GatheringDetailUserInfo = ({ username }: GatheringDetailUserInfoProps) => {
  return (
    <div className={styles.author}>
      {/* <img alt={username} className={styles.profileImg} src={} /> */}
      <Logo className={styles.profileImg} />
      <span className={styles.name}>{username}</span>
      {/* <span className={styles.position}>{userData?.role}</span> */}
    </div>
  );
};
