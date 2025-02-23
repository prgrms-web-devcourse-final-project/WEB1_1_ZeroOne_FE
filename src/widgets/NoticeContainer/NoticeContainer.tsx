import { faSmile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';
import { useEffect, useState } from 'react';

import styles from './NoticeContainer.module.scss';

import { NoticeItem } from '@/features/notification';
import type { Notification } from '@/features/notification/notification.dto';

interface NoticeContainerProps {
  isNotice: boolean;
  notifications: Notification[];
}

export const NoticeContainer = ({ isNotice, notifications }: NoticeContainerProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    if (isNotice) {
      setIsVisible(true);
      const transitionHandler = setTimeout(() => {
        setAnimationClass('slideDown');
      }, 10);

      return () => {
        clearTimeout(transitionHandler);
      };
    } else {
      setAnimationClass('slideUp');
      const transitionHandler = setTimeout(() => {
        setIsVisible(false);
      }, 300);

      return () => {
        clearTimeout(transitionHandler);
      };
    }
  }, [isNotice]);

  return (
    <div className={cn(styles.containerWrapper, { [styles.hide]: !isVisible })}>
      <div className={cn(styles.container, styles[animationClass])}>
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
