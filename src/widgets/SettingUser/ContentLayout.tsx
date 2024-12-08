import { useNavigate } from 'react-router-dom';

import styles from './ContentLayout.module.scss';
import { Logout } from './Logout';
import { SetArchive } from './SetArchive';
import { SetBadge } from './SetBadge';
import { SetProfile } from './SetProfile';

import type { UserDataState } from '@/features/user/model/user.store';
import { useRoleGuard } from '@/shared/hook/useRoleGuard';
import { customConfirm } from '@/shared/ui';

const renderContentComponent = (path: string, userData: UserDataState) => {
  if (path === '/my/badge') {
    return <SetBadge />;
  }
  if (path === '/my/archive') {
    return <SetArchive />;
  }
  if (path === '/my/logout') {
    return <Logout />;
  }
  return <SetProfile userData={userData} />;
};

interface ContentLayoutProps {
  activeTab: {
    path: string;
    label: string;
  };
}

export const ContentLayout = ({ activeTab }: ContentLayoutProps) => {
  // 로그인한 유저만 접근 가능
  const { userData } = useRoleGuard({
    requiredRoles: ['ADMIN', 'JUST_NEWBIE', 'OLD_NEWBIE', 'REAL_NEWBIE', 'USER'],
    onAccessDenied: () => {
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
    },
  });
  const navigate = useNavigate();
  const ContentComponent = userData ? renderContentComponent(activeTab.path, userData) : null;

  return (
    <div className={styles.sectionWrapper}>
      <h2>{activeTab.label}</h2>
      {ContentComponent}
    </div>
  );
};
