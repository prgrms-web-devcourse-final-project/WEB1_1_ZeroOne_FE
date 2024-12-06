import { useNavigate } from 'react-router-dom';

import styles from './MyPage.module.scss';

import { useRoleGuard } from '@/shared/hook/useRoleGuard';
import { ContentLayout, SideTab, useMyTab } from '@/widgets';

export const MyPage = () => {
  const navigate = useNavigate();
  // REAL_NEWBIE면 register page로 redirect
  useRoleGuard({
    requiredRoles: ['JUST_NEWBIE', 'ADMIN', 'OLD_NEWBIE', 'USER'],
    onAccessDenied: () => {
      navigate('/register');
    },
  });

  const { activeTabItem, isActivePath } = useMyTab();
  return (
    <div className={styles.myPageContainer}>
      <div className={styles.tabContainer}>
        <SideTab isActivePath={isActivePath} />
      </div>
      <section className={styles.contentContainer}>
        <ContentLayout activeTab={activeTabItem} />
      </section>
    </div>
  );
};
