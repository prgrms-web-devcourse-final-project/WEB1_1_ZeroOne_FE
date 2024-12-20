import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';

import styles from './NoticeItem.module.scss';
import type { Notification } from '../notification.dto';
import { useDeleteNotification } from '../notification.hook';
import { NotificationMap } from '../notification.type';

import { useCreateChatRoom } from '@/features/chatting/api/chatting.hook';
import { useModalStore } from '@/shared/model/modalStore';

export const NoticeItem = ({ notification }: { notification: Notification }) => {
  const { mutate: deleteNotification } = useDeleteNotification(notification.id);
  const { mutate: createChatRoom } = useCreateChatRoom();
  const open = useModalStore(state => state.actions.open);

  return (
    <div className={styles.container}>
      <div className={cn(styles.icon, styles[NotificationMap[notification.type].label])}>
        <FontAwesomeIcon icon={NotificationMap[notification.type].icon} />
      </div>
      <p className={styles.description}>{notification.content}</p>
      <div className={styles.buttons}>
        {notification.type !== 'LIKE' && (
          <FontAwesomeIcon
            className={cn(styles.check, styles.button)}
            icon={faCircleCheck}
            onClick={() => {
              createChatRoom(
                { chatCategory: notification.type, targetId: Number(notification.acceptUrl) },
                {
                  onSuccess: () => {
                    open('chatting');
                    deleteNotification();
                  },
                },
              );
            }}
          />
        )}
        <FontAwesomeIcon
          className={cn(styles.cancel, styles.button)}
          icon={faCircleXmark}
          onClick={() => {
            deleteNotification();
          }}
        />
      </div>
    </div>
  );
};
