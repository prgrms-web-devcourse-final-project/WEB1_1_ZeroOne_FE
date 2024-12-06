import { useQuery } from '@tanstack/react-query';

import { getNotifications } from './notification.api';

export const useNotificationList = () =>
  useQuery({
    queryKey: ['/notifications'],
    queryFn: getNotifications,
    enabled: false,
  });
