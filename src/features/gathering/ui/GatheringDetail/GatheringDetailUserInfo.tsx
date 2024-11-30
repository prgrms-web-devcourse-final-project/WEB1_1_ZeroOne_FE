import styles from './GatheringDetailUserInfo.module.scss';

interface GatheringDetailUserInfoProps {
  username: string;
  position?: string;
  profileImage?: string;
}

export const GatheringDetailUserInfo = ({
  username,
  position = 'Front Developer',
  profileImage = '/default-profile.png',
}: GatheringDetailUserInfoProps) => {
  return (
    <div className={styles.author}>
      <img alt={username} className={styles.profileImg} src={profileImage} />
      <span className={styles.name}>{username}</span>
      <span className={styles.position}>{position}</span>
    </div>
  );
};
