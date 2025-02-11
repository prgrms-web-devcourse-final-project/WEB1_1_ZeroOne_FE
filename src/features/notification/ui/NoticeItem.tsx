import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';
import { useNavigate } from 'react-router-dom';

import styles from './NoticeItem.module.scss';
import type { Notification } from '../notification.dto';
import { useDeleteNotification } from '../notification.hook';
import type { NotificationType } from '../notification.type';
import { NotificationMap } from '../notification.type';

import { useChatRoomParticipation } from '@/features/chatting/api/chatting.hook';
import type { ChatCategory } from '@/features/chatting/api/types';
import { useModalStore } from '@/shared/model/modalStore';
import { setTextEllipsis } from '@/shared/util/setTextEllipsis';

const isChatableNotification = (
  type: NotificationType,
): type is Exclude<NotificationType, 'LIKE'> => {
  const chatCategories: ChatCategory[] = ['MENTORING', 'FEEDBACK', 'GATHERING', 'COFFEE_CHAT'];
  return chatCategories.includes(type as ChatCategory);
};

interface NoticeItemProps {
  notification: Notification;
}

export const NoticeItem = ({ notification }: NoticeItemProps) => {
  const { mutate: deleteNotification } = useDeleteNotification(notification.id);
  const { mutate: participateChat } = useChatRoomParticipation();
  const open = useModalStore(state => state.actions.open);
  const navigate = useNavigate();

  const handleClickItem = () => {
    if (notification.type === 'LIKE') {
      navigate(`/${notification.likeType.toLowerCase()}/${notification.contentId}`);
      return;
    }
  };

  const handleParticipateChat = () => {
    if (!isChatableNotification(notification.type)) return;

    participateChat(Number(notification.acceptUrl), {
      onSuccess: () => {
        open('chatting');
        deleteNotification();
      },
    });
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
        {isChatableNotification(notification.type) && (
          <FontAwesomeIcon
            className={cn(styles.check, styles.button)}
            icon={faCircleCheck}
            onClick={handleParticipateChat}
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
