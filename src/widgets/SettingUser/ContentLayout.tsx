import styles from './ContentLayout.module.scss';
import { SetArchive } from './SetArchive';
import { SetBadge } from './SetBadge';
import { SetProfile } from './SetProfile';

import { useAuthPage } from '@/shared/hook/useAuthPage';

const renderContentComponent = (path: string, userId: number) => {
  if (path === '/my/badge') {
    return <SetBadge />;
  }
  if (path === '/my/archive') {
    return <SetArchive />;
  }
  return <SetProfile userId={userId} />;
};

interface ContentLayoutProps {
  activeTab: {
    path: string;
    label: string;
  };
}

export const ContentLayout = ({ activeTab }: ContentLayoutProps) => {
  const { userData } = useAuthPage();
  const ContentComponent = userData
    ? renderContentComponent(activeTab.path, userData.userId)
    : null;

  return (
    <div className={styles.sectionWrapper}>
      <h2>{activeTab.label}</h2>
      {ContentComponent}
    </div>
  );
};
