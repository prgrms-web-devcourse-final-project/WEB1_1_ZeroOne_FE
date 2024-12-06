import cn from 'classnames';

import styles from './NoticeContainer.module.scss';

import { NoticeItem } from '@/features/notification';
import { useNotificationList } from '@/features/notification/notification.hook';

export const NoticeContainer = ({ isNotice }: { isNotice: boolean }) => {
  const { data: notifications } = useNotificationList();

  return (
    <div className={cn(styles.container, { [styles.visible]: isNotice })}>
      {notifications?.data.notifications.map(noti => {
        return <NoticeItem key={noti.id} notification={noti} />;
      })}
    </div>
  );
};
