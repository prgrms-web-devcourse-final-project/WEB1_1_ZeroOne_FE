import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getLocalAccessToken, removeLocalAccessToken } from '@/features/auth/auth.api';
import { useUserStore } from '@/features/user/model/user.store';
import { getMyProfile } from '@/features/user/user.api';
import { setInterceptorEvents } from '@/shared/api/baseApi';
import { customConfirm } from '@/shared/ui';

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const accessToken = getLocalAccessToken();
  const { setUserData, clearUserData } = useUserStore(state => state.actions);

  useEffect(() => {
    const getUserData = async () => {
      try {
        if (accessToken) {
          const userData = await getMyProfile().then(res => res.data);
          if (!userData) throw new Error('유저 정보를 찾을 수가 없습니다.');
          setUserData(userData);
          return userData;
        }
        clearUserData();
      } catch (error) {
        console.error('유저 데이터를 불러오는 중 오류가 발생했습니다.', error);
      }
    };

    void getUserData();
  }, [accessToken, setUserData, clearUserData]);

  //인터셉터 함수 등록 effects
  useEffect(() => {
    const logout = async (text: string) => {
      try {
        await customConfirm({
          title: '로그아웃',
          text,
          icon: 'error',
          showCancelButton: false,
        });
        removeLocalAccessToken();
        clearUserData();
        navigate('/');
      } catch (error) {
        console.error('로그아웃 실패:', error);
      }
    };

    setInterceptorEvents('logout', () => {
      void logout('토큰이 유효하지 않습니다.');
    });
  }, [clearUserData]);

  return <>{children}</>;
};

export default AuthProvider;
