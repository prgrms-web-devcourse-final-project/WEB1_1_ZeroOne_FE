import { useMutation, useQuery } from '@tanstack/react-query';

import { getChatRoomList, participateChatRoom, postCreateChatRoom } from './chatting.api';
import type { ChatCategory, ChatListResponse } from './types';

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
    queryKey: ['chatRooms'],
    queryFn: async () => {
      try {
        const response = await getChatRoomList();
        console.log('채팅방 목록 응답:', response); // 디버깅용
        return response;
      } catch (error) {
        console.error('채팅방 목록 조회 실패:', error);
        throw error;
      }
    },
    // 실패 시 재시도 방지
    retry: false,
    // 빈 데이터 초기값 설정
    initialData: {
      data: {
        chatRooms: [],
      },
      timeStamp: new Date().toISOString(),
    },
  });
};
// 채팅방 참여 훅
export const useChatRoomParticipation = () =>
  useMutation({
    mutationFn: (chatRoomId: number) => participateChatRoom(chatRoomId),
    onSuccess: async response => {
      console.log('채팅방 참여 결과:', response);
      await customToast({ text: '채팅방에 참여하였습니다.', timer: 3000, icon: 'success' });
    },
    onError: async () => {
      await customToast({ text: '채팅방 참여에 실패하였습니다', timer: 3000, icon: 'error' });
    },
  });
