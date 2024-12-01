import styles from './ContentLayout.module.scss';
import { SetArchive } from './SetArchive';
import { SetBadge } from './SetBadge';
import { SetProfile } from './SetProfile';

const renderContentComponent = (path: string) => {
  if (path === '/my/badge') {
    return <SetBadge />;
  }
  if (path === '/my/archive') {
    return <SetArchive />;
  }
  return <SetProfile />;
};

interface ContentLayoutProps {
  activeTab: {
    path: string;
    label: string;
  };
}

export const ContentLayout = ({ activeTab }: ContentLayoutProps) => {
  const ContentComponent = renderContentComponent(activeTab.path);

  return (
    <div className={styles.sectionWrapper}>
      <h2>{activeTab.label}</h2>
      {ContentComponent}
    </div>
  );
};
