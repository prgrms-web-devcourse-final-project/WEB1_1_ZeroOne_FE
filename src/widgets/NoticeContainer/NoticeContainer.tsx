import styles from './NoticeContainer.module.scss';

import { NoticeItem } from '@/features/notification';

export const NoticeContainer = () => {
  return (
    <div className={styles.container}>
      <NoticeItem type='LIKE' />
      <NoticeItem type='FEEDBACK' />
      <NoticeItem type='GATHERING' />
      <NoticeItem type='COFFEE_CHAT' />
    </div>
  );
};
