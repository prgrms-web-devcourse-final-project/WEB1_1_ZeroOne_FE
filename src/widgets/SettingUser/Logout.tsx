import { useNavigate } from 'react-router-dom';

import styles from './Logout.module.scss';

import { logout } from '@/features/auth/auth.api';
import { useUserStore } from '@/features/user/model/user.store';
import { Button, customConfirm } from '@/shared/ui';
export const Logout = () => {
  const navigate = useNavigate();
  const { clearUserData } = useUserStore(state => state.actions);

  const logoutHandler = async () => {
    navigate('/');
    await logout();
    clearUserData();
    await customConfirm({
      title: '로그아웃',
      text: '로그아웃 되었습니다.',
      icon: 'info',
      showCancelButton: false,
    });
  };
  return (
    <div className={styles.container}>
      <Button
        onClick={() => {
          void logoutHandler();
        }}
      >
        로그아웃
      </Button>
    </div>
  );
};
