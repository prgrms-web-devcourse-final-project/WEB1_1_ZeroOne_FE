import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';

import styles from './NoticeItem.module.scss';
import { NotificationMap, type NotificationType } from '../notification.type';

export const NoticeItem = ({ type }: { type: NotificationType }) => {
  return (
    <div className={styles.container}>
      <div className={cn(styles.icon, styles[NotificationMap[type].label])}>
        <FontAwesomeIcon icon={NotificationMap[type].icon} />
      </div>
      <p className={styles.description}>{NotificationMap[type].description}</p>
      <div className={styles.buttons}>
        <FontAwesomeIcon className={cn(styles.check, styles.button)} icon={faCircleCheck} />
        <FontAwesomeIcon className={cn(styles.cancel, styles.button)} icon={faCircleXmark} />
      </div>
    </div>
  );
};
