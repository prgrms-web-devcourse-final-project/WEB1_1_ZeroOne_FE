import type { NotificationType } from './notification.type';

type ContentType = 'ARCHIVE' | 'GATHERING';

export interface Notification {
  id: number;
  title: string;
  content: string;
  type: NotificationType;
  isRead: boolean;
  userId: number;
  contentId: number;
  likeType: ContentType;
  acceptUrl: string;
  denyUrl: string;
  createdAt: string;
}

export interface GetNotificationResponse {
  data: {
    notifications: Notification[];
  };
  timeStamp: string;
}
