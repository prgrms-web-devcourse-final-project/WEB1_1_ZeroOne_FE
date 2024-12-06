import type { GetNotificationResponse } from './notification.dto';

import api from '@/shared/api/baseApi';

export const getNotifications = () =>
  api.get<GetNotificationResponse>('/notification').then(res => res.data);
