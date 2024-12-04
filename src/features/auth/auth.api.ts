import { AxiosError } from 'axios';

import type { TokenApiResponse } from './auth.dto';
import type { PostUserResponseDTO } from '../user/user.dto';

import api from '@/shared/api/baseApi';

export const loginWithToken = async (token: string) => {
  const response = await api.get<TokenApiResponse>(`/token/issue?token=${token}`);
  const newAccessToken = response.headers['authorization'];
  if (newAccessToken) {
    setLocalAccessToken(newAccessToken);
  }

  return newAccessToken as string;
};

export const logout = async () => {
  try {
    await api.post<PostUserResponseDTO>('/user/logout');
    removeLocalAccessToken();
  } catch (error) {
    console.error('로그아웃 실패:', error);
  }
};

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

    const newAccessToken = response.headers['authorization'];

    if (newAccessToken) {
      setLocalAccessToken(newAccessToken);
      return newAccessToken as string;
    } else {
      throw new Error('accessToken이 헤더에 포함되어 있지 않습니다.');
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(`토큰 재발행 중 오류가 발생했습니다. ${error.message}`);
    }
  }
};
