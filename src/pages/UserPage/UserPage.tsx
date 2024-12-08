import { useNavigate, useParams } from 'react-router-dom';

import styles from './UserPage.module.scss';

import { UserBanner, UserProfileInfo } from '@/features/user';
import { useUserStore } from '@/features/user/model/user.store';
import { useGetUserProfile } from '@/features/user/user.hook';
import { UserContents } from '@/widgets';

export const UserPageWrapper = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  if (!userId || isNaN(Number(userId))) {
    navigate('/');
    return null;
  }

  return <UserPage userId={Number(userId)} />;
};

interface UserPageProps {
  userId: number;
}

export const UserPage = ({ userId }: UserPageProps) => {
  const { data, isLoading } = useGetUserProfile(userId);
  const userData = useUserStore(state => state.userData);

  const isMyPage = userData ? userData.userId === userId : false;

  return (
    <div className={styles.container}>
      {/** 배너 컴포넌트 분리 예정 */}
      <UserBanner data={data?.data} isLoading={isLoading} />
      <div className={styles.userSectionWrapper}>
        <div className={styles.userProfileContainer}>
          {!isLoading && data && data.data ? (
            <UserProfileInfo data={data.data} isMyPage={isMyPage} />
          ) : null}
        </div>
        <UserContents userId={userId} />
      </div>
    </div>
  );
};
