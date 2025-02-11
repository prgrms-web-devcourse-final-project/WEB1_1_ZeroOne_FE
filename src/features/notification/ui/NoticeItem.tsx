import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';
import { useNavigate } from 'react-router-dom';

import styles from './NoticeItem.module.scss';
import type { Notification } from '../notification.dto';
import { useDeleteNotification } from '../notification.hook';
import { NotificationMap } from '../notification.type';

import { useCreateChatRoom } from '@/features/chatting/api/chatting.hook';
import { useModalStore } from '@/shared/model/modalStore';
import { setTextEllipsis } from '@/shared/util/setTextEllipsis';

export const NoticeItem = ({ notification }: { notification: Notification }) => {
  const { mutate: deleteNotification } = useDeleteNotification(notification.id);
  const { mutate: createChatRoom } = useCreateChatRoom();
  const open = useModalStore(state => state.actions.open);
  const navigate = useNavigate();

  const handleClickItem = () => {
    if (notification.type === 'LIKE') {
      navigate(`/${notification.likeType.toLowerCase()}/${notification.contentId}`);
      return;
    }
  };

  return (
    <div className={styles.container} onClick={handleClickItem}>
      <div className={cn(styles.icon, styles[NotificationMap[notification.type].label])}>
        <FontAwesomeIcon icon={NotificationMap[notification.type].icon} />
      </div>
      <div className={styles.contents}>
        {notification.contentTitle && (
          <span
            className={styles.title}
          >{`"${setTextEllipsis(notification.contentTitle, 13)}"`}</span>
        )}
        <p className={styles.description}>{notification.content}</p>
      </div>
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
          onClick={e => {
            e.stopPropagation();
            deleteNotification();
          }}
        />
      </div>
    </div>
  );
};
