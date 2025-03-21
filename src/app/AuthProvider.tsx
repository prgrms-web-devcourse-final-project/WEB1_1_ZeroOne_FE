import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getLocalAccessToken, removeLocalAccessToken } from '@/features/auth/lib/auth.api';
import { useUserStore } from '@/features/user/model/user.store';
import { getMyProfile } from '@/features/user/user.api';
import { setInterceptorEvents } from '@/shared/api/baseApi';
import { useRegistAlarm } from '@/shared/hook/useRegistAlarm';
import { customConfirm } from '@/shared/ui';

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const accessToken = getLocalAccessToken();
  const { setUserData, clearUserData, done } = useUserStore(state => state.actions);
  useRegistAlarm();

  useEffect(() => {
    const getUserData = async () => {
      try {
        if (accessToken) {
          const userData = await getMyProfile().then(res => res.data);
          if (!userData) throw new Error('유저 정보를 찾을 수가 없습니다.');
          setUserData(userData);

          done();
          return userData;
        }
        clearUserData();
        done();
      } catch (error) {
        console.error('유저 데이터를 불러오는 중 오류가 발생했습니다.', error);
      }
    };

    void getUserData();
  }, []);

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

    setInterceptorEvents('logout', (text: string) => {
      void logout(text);
    });
  }, []);

  return <>{children}</>;
};

export default AuthProvider;
