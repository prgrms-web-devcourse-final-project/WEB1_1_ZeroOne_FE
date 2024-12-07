import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { deleteNotification, getNotifications } from './notification.api';
import type { GetNotificationResponse } from './notification.dto';

import { customToast } from '@/shared/ui';

export const useNotificationList = () =>
  useQuery({
    queryKey: ['/notifications'],
    queryFn: getNotifications,
    enabled: false,
  });

export const useDeleteNotification = (notificationId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteNotification(notificationId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['/notifications'] });

      const previousNotifications = queryClient.getQueryData(['/notifications']);

      queryClient.setQueryData(['/notifications'], (old: GetNotificationResponse) => {
        if (!old) return old;

        const updatedNotifications = old.data.notifications.filter(
          notification => notification.id !== notificationId,
        );

        return {
          data: {
            notifications: updatedNotifications,
          },
          timeStamp: old.timeStamp,
        };
      });

      return { previousNotifications };
    },
    onError: async (err, _, context) => {
      await customToast({ text: '알림 삭제에 실패하였습니다', timer: 3000, icon: 'error' });
      if (context) {
        queryClient.setQueryData(['/notifications'], context.previousNotifications);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] }).catch(err => {
        console.error('Failed to invalidate queries:', err);
      });
    },
  });
};
