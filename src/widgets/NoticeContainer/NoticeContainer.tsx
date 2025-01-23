import { faSmile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';

import styles from './NoticeContainer.module.scss';

import { NoticeItem } from '@/features/notification';
import type { Notification } from '@/features/notification/notification.dto';

interface NoticeContainerProps {
  isNotice: boolean;
  notifications: Notification[];
}

export const NoticeContainer = ({ isNotice, notifications }: NoticeContainerProps) => {
  return (
    <div className={cn(styles.containerWrapper)}>
      <div className={cn(styles.container, { [styles.visible]: isNotice })}>
        {notifications.length === 0 && (
          <div className={styles.empty}>
            알림이 없습니다 <FontAwesomeIcon icon={faSmile} />
          </div>
        )}
        {notifications.map(noti => {
          return <NoticeItem key={noti.id} notification={noti} />;
        })}
      </div>
    </div>
  );
};
