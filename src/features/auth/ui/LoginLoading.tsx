import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { loginWithToken, removeLocalAccessToken, setLocalAccessToken } from '../lib/auth.api';

import type { UserDataState } from '@/features/user/model/user.store';
import { useUserStore } from '@/features/user/model/user.store';
import { getMyProfile } from '@/features/user/user.api';
import { customConfirm } from '@/shared/ui';

export const LoginLoading = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { setUserData } = useUserStore(state => state.actions);
  const token = params.get('token') ?? '';

  useEffect(() => {
    const login = async () => {
      try {
        if (!token) {
          await customConfirm({
            title: '잘못된 접근',
            text: '메인 페이지로 이동합니다.',
            icon: 'error',
            showCancelButton: false,
          });
          return;
        }

        const newAccessToken = await loginWithToken(token);

        if (newAccessToken) {
          setLocalAccessToken(newAccessToken);
        }

        const userData = (await getMyProfile().then(res => res.data)) as UserDataState;
        setUserData(userData);

        navigate('/');
      } catch (error) {
        console.error(error);
        await customConfirm({
          title: '로그인 실패',
          text: '메인 페이지로 이동합니다.',
          icon: 'error',
          showCancelButton: false,
        });
        removeLocalAccessToken();
        navigate('/');
      }
    };

    void login();
  }, []);

  return <div>Redirect...</div>;
};
