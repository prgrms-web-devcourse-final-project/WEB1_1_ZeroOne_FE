import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { customConfirm } from '../ui';

import { useUserStore } from '@/features/user/model/user.store';

const excludePath = ['/register', '/my'];

const checkPath = (path: string, pathList: string[]) => {
  for (const excludePath of pathList) {
    if (path.startsWith(excludePath)) {
      return false;
    }
  }

  return true;
};

export const useRegistAlarm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useUserStore(state => state.userData);

  useEffect(() => {
    if (!userData) return;
    if (userData.role === 'REAL_NEWBIE' && checkPath(location.pathname, excludePath)) {
      void customConfirm({
        title: '유저 등록',
        text: '아직 등록된 유저 프로필이 없습니다!\n프로필을 등록해주세요.',
        icon: 'info',
      }).then(result => {
        if (result.isConfirmed) {
          navigate('/register');
        }
      });
    }
  }, [userData, navigate, location.pathname]);
};
