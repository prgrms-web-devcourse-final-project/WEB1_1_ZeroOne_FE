import { useMutation } from '@tanstack/react-query';

import { postCreateChatRoom } from './chatting.api';

import type { NotificationType } from '@/features/notification/notification.type';
import { customToast } from '@/shared/ui';

export const useCreateChatRoom = (chatCategory: NotificationType, targetId: number) =>
  useMutation({
    mutationFn: () => postCreateChatRoom(chatCategory, targetId),
    onSuccess: async () => {
      await customToast({ text: '채팅방이 생성되었습니다.', timer: 3000, icon: 'success' });
    },
    onError: async () => {
      await customToast({ text: '채팅방 생성에 실패하였습니다', timer: 3000, icon: 'error' });
    },
  });
