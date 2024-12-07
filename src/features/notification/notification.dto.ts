import type { NotificationType } from './notification.type';

export interface Notification {
  id: number;
  title: string;
  content: string;
  type: NotificationType;
  isRead: boolean;
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
