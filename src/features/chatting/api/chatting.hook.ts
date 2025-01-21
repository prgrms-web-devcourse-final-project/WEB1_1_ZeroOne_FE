import { useMutation } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import { postCreateChatRoom } from './chatting.api';
import { getChatRoomList } from './chatting.api';
import type { ChatCategory } from './types';
import type { ChatListResponse } from './types';

import { customToast } from '@/shared/ui';

export const useCreateChatRoom = () =>
  useMutation({
    mutationFn: ({ chatCategory, targetId }: { chatCategory: ChatCategory; targetId: number }) =>
      postCreateChatRoom(chatCategory, targetId),
    onSuccess: async response => {
      console.log('채팅방 생성 결과:', response); // 응답 데이터 확인
      await customToast({ text: '채팅방이 생성되었습니다.', timer: 3000, icon: 'success' });
    },
    onError: async () => {
      await customToast({ text: '채팅방 생성에 실패하였습니다', timer: 3000, icon: 'error' });
    },
  });

export const useChattingList = () => {
  return useQuery<ChatListResponse>({
    queryKey: ['chatRooms'] as const,
    queryFn: getChatRoomList,
  });
};
