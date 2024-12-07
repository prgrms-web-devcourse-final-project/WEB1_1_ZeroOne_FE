import { faSmile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';
import { useEffect } from 'react';

import styles from './NoticeContainer.module.scss';

import { NoticeItem } from '@/features/notification';
import { useNotificationList } from '@/features/notification/notification.hook';

export const NoticeContainer = ({ isNotice }: { isNotice: boolean }) => {
  const { data: notifications, refetch: fetchNotifications } = useNotificationList();

  useEffect(() => {
    if (isNotice) {
      void fetchNotifications();
    }
  }, [isNotice, fetchNotifications]);

  return (
    <div className={cn(styles.container, { [styles.visible]: isNotice })}>
      {notifications?.data.notifications.length === 0 && (
        <div className={styles.empty}>
          알림이 없습니다 <FontAwesomeIcon icon={faSmile} />
        </div>
      )}
      {notifications?.data.notifications.map(noti => {
        return <NoticeItem key={noti.id} notification={noti} />;
      })}
    </div>
  );
};
