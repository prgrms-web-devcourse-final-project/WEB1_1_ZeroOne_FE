import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShallow } from 'zustand/shallow';

import { customConfirm } from '../ui';

import { useUserStore } from '@/features/user/model/user.store';

interface useAuthPageProps {
  onAccessDenied?: () => void;
}

export const useAuthPage = ({ onAccessDenied }: useAuthPageProps) => {
  const { userData, loading } = useUserStore(
    useShallow(state => ({ userData: state.userData, loading: state.loading })),
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    const defaultDeniedHandler = async () => {
      await customConfirm({
        title: '잘못된 접근',
        text: '유저 정보를 확인할 수 없습니다.\n로그인하고 다시 시도해주세요.',
        icon: 'warning',
        showCancelButton: false,
      }).then(result => {
        if (result.isConfirmed) {
          navigate('/');
          return;
        }
      });
    };

    if (!userData) {
      if (onAccessDenied) {
        onAccessDenied();
      } else {
        void defaultDeniedHandler();
      }
    }
  }, [onAccessDenied, navigate, userData, loading]);

  return { userData };
};
