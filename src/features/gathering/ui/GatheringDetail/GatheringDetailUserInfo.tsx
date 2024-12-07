import styles from './GatheringDetailUserInfo.module.scss';

interface GatheringDetailUserInfoProps {
  username: string;
  position?: string;
  profileImage?: string;
}
import { useUserStore } from '@/features/user/model/user.store';

export const GatheringDetailUserInfo = ({
  username,
  // position = 'Front Developer',
  // profileImage = '/default-profile.png',
}: GatheringDetailUserInfoProps) => {
  const userData = useUserStore(state => state.userData);
  return (
    <div className={styles.author}>
      <img alt={username} className={styles.profileImg} src={userData?.imageUrl} />
      <span className={styles.name}>{userData?.name}</span>
      <span className={styles.position}>{userData?.role}</span>
    </div>
  );
};
