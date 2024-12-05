import styles from './MyPage.module.scss';

import { useRegistAlarm } from '@/shared/hook/useRegistAlarm';
import { ContentLayout, SideTab, useMyTab } from '@/widgets';

export const MyPage = () => {
  useRegistAlarm();

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
