import styles from './MyPage.module.scss';

import { ContentLayout } from '@/widgets/SettingUser/ContentLayout';
import { useMyTab } from '@/widgets/SettingUser/hooks/useMyTab';
import { SideTab } from '@/widgets/SettingUser/SideTab';

export const MyPage = () => {
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
