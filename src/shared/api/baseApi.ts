import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';

import { customConfirm } from '../ui';

import { getLocalAccessToken, reissueToken } from '@/features/auth/auth.api';

let isRefreshing = false;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type EventHandler = (...args: any[]) => void;

interface interceptorEventsTypes {
  [event: string]: EventHandler;
}

const interceptorEvents: interceptorEventsTypes = {
  logout: () => {},
};

export const setInterceptorEvents = (event: string, handler: EventHandler) => {
  interceptorEvents[event] = handler;
};

const api = axios.create({
  baseURL: `https://api.palettee.site`, // Backend API Domain 주소
  timeout: 10_000,
  withCredentials: true,
});

api.interceptors.request.use(config => {
  const accessToken = getLocalAccessToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  // const decodedUrl = decodeURIComponent(`${config.baseURL}${config.url}${config.params ? '?' + new URLSearchParams(config.params).toString() : ''}`);
    // console.log('Decoded URL:', decodedUrl);
  return config;
});

api.interceptors.response.use(
  response => response,
  async error => {
    console.log('에러 ㅣ ', error.response);
    if (error.response?.status === 401) {
      if (isRefreshing) {
        return Promise.reject(error instanceof Error ? error : new Error('Unknown Error'));
      }

      isRefreshing = true;

      try {
        await reissueToken();
        const accessToken = getLocalAccessToken();

        if (accessToken && error.config) {
          error.config.headers.Authorization = `${accessToken}`;
          return api.request(error.config as AxiosRequestConfig);
        }
      } catch (reissueError) {
        interceptorEvents['logout']('토큰이 만료되었습니다.');
        console.error('토큰 재발급 실패:', reissueError);
      } finally {
        // eslint-disable-next-line require-atomic-updates
        isRefreshing = false;
        customConfirm({ text: '로그인이 필요합니다.', title: '로그인', icon: 'info' }).catch(
          console.error,
        );
      }
    }

    return Promise.reject(error instanceof Error ? error : new Error('Unknown Error'));
  },
);

export default api;
