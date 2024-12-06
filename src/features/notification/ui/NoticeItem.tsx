import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';

import styles from './NoticeItem.module.scss';
import type { Notification } from '../notification.dto';
import { NotificationMap } from '../notification.type';

export const NoticeItem = ({ notification }: { notification: Notification }) => {
  return (
    <div className={styles.container}>
      <div className={cn(styles.icon, styles[NotificationMap[notification.type].label])}>
        <FontAwesomeIcon icon={NotificationMap[notification.type].icon} />
      </div>
      <p className={styles.description}>{notification.content}</p>
      <div className={styles.buttons}>
        <FontAwesomeIcon
          className={cn(styles.check, styles.button)}
          icon={faCircleCheck}
          onClick={() => {}}
        />
        <FontAwesomeIcon
          className={cn(styles.cancel, styles.button)}
          icon={faCircleXmark}
          onClick={() => {}}
        />
      </div>
    </div>
  );
};
