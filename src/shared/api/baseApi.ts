import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';

import { useAuth } from '@/app/AuthProvider';

const api = axios.create({
  baseURL: ``, // Backend API Domain 주소
  timeout: 10_000,
  withCredentials: true,
});

api.interceptors.request.use(config => {
  const { accessToken } = useAuth();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  async error => {
    const { reissueToken } = useAuth();

    if (error.response?.status === 401) {
      try {
        await reissueToken();
        const { accessToken } = useAuth();

        if (accessToken && error.config) {
          error.config.headers.Authorization = `Bearer ${accessToken}`;
          return api.request(error.config as AxiosRequestConfig);
        }
      } catch (reissueError) {
        console.error('토큰 재발급 실패:', reissueError);
      }
    }

    return Promise.reject(error instanceof Error ? error : new Error('Unknown Error'));
  },
);

export default api;
