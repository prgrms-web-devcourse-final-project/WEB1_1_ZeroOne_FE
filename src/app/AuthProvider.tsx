import axios from 'axios';
import type { ReactNode } from 'react';
import { createContext, useContext, useRef, useState } from 'react';

import api from '@/shared/api/baseApi';
import { customConfirm } from '@/shared/ui';

interface AuthContextType {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  reissueToken: () => Promise<void>;
  logout: () => Promise<void>;
  removeToken: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem('accessToken'),
  );
  const isRefreshing = useRef(false);

  const reissueToken = async () => {
    if (isRefreshing.current) return;

    isRefreshing.current = true;

    try {
      const response = await axios.post('/token/reissue', {}, { withCredentials: true });

      const newAccessToken = (response.headers['authorization'] as string)?.split(' ')[1];

      if (newAccessToken) {
        setAccessToken(newAccessToken);
        localStorage.setItem('accessToken', newAccessToken);
      } else {
        throw new Error('accessToken이 헤더에 포함되어 있지 않습니다.');
      }
    } catch (error) {
      console.error('토큰 재발급 실패:', error);
      removeToken();
    } finally {
      // eslint-disable-next-line require-atomic-updates
      isRefreshing.current = false;
    }
  };

  const removeToken = () => {
    setAccessToken(null);
    localStorage.removeItem('accessToken');
    customConfirm({ title: '로그인', text: '로그인 페이지로 이동합니다.', icon: 'info' });
  };

  const logout = async () => {
    try {
      await api.post('/user/logout');

      setAccessToken(null);
      localStorage.removeItem('accessToken');
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, setAccessToken, reissueToken, logout, removeToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('AuthProvider Error');
  }
  return context;
};

export default AuthProvider;
