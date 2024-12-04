import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShallow } from 'zustand/shallow';

import { customConfirm } from '../ui';

import { useUserStore } from '@/features/user/model/user.store';
import type { UserRole } from '@/features/user/user.dto';

interface UseRoleGuardProps {
  requiredRoles: UserRole[]; // 허용된 역할 목록
  onAccessDenied?: () => void; // 접근 제한 시 실행할 이벤트
}

export const useRoleGuard = ({ requiredRoles, onAccessDenied }: UseRoleGuardProps) => {
  const { userData, loading } = useUserStore(
    useShallow(state => ({ userData: state.userData, loading: state.loading })),
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return; // 로딩 중일 때는 아무 작업도 하지 않음

    const defaultDeniedHandler = async () => {
      await customConfirm({
        title: '접근 제한',
        text: '접근 권한이 없습니다.',
        icon: 'warning',
        showCancelButton: false,
      }).then(result => {
        if (result.isConfirmed) {
          navigate('/');
          return;
        }
      });
    };

    if (!userData || !requiredRoles.includes(userData.role)) {
      if (onAccessDenied) {
        onAccessDenied();
      } else {
        void defaultDeniedHandler();
      }
    }
  }, [userData, loading, requiredRoles, onAccessDenied, navigate]);
};
