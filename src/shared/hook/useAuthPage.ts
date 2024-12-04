import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { customConfirm } from '../ui';

import { useUserStore } from '@/features/user/model/user.store';

export const useAuthPage = () => {
  const userData = useUserStore(state => state.userData);
  const navigate = useNavigate();
  useEffect(() => {
    if (!userData) {
      void customConfirm({
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
    }
  }, []);

  return { userData };
};
