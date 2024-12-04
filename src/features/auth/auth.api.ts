import { AxiosError } from 'axios';

import type { TokenApiResponse } from './auth.dto';

import api from '@/shared/api/baseApi';

export const loginWithToken = (token: string) =>
  api.get<TokenApiResponse>(`/token/issue?token=${token}`).then(res => res.data);

export const getLocalAccessToken = () => {
  return localStorage.getItem('accessToken');
};

export const setLocalAccessToken = (token: string) => {
  localStorage.setItem('accessToken', token);
};

export const removeLocalAccessToken = () => {
  localStorage.removeItem('accessToken');
};

export const reissueToken = async () => {
  try {
    const response = await api.post('/token/reissue');

    const newAccessToken = (response.headers['authorization'] as string)?.split(' ')[1];

    if (newAccessToken) {
      setLocalAccessToken(newAccessToken);
      return newAccessToken;
    } else {
      throw new Error('accessToken이 헤더에 포함되어 있지 않습니다.');
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(`토큰 재발행 중 오류가 발생했습니다. ${error.message}`);
    }
  }
};
