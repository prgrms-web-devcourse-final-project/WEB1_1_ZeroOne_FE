import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { setLocalAccessToken } from '../auth.api';

import api from '@/shared/api/baseApi';
import { customConfirm } from '@/shared/ui';

export const LoginLoading = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
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

        const response = await api.get(`/token/issue?token=${token}`);
        console.log(response.headers);
        const newAccessToken = (response.headers['authorization'] as string)?.split(' ')[1];
        if (newAccessToken) {
          setLocalAccessToken(newAccessToken);
        }
        navigate('/');
      } catch (error) {
        console.error(error);
        await customConfirm({
          title: '잘못된 토큰',
          text: '메인 페이지로 이동합니다.',
          icon: 'error',
          showCancelButton: false,
        });
        navigate('/');
      }
    };

    void login();
  }, [navigate, token]);

  return <div>Redirect...</div>;
};
