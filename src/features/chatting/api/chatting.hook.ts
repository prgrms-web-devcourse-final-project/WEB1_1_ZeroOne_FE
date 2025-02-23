import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useInfiniteQuery } from '@tanstack/react-query';

import {
  getChatRoomList,
  participateChatRoom,
  postCreateChatRoom,
  getChatHistory,
  leaveChatRoom,
} from './chatting.api';
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

export const useChatHistory = (chatRoomId: number, size: number = 20) => {
  return useInfiniteQuery({
    queryKey: ['chatHistory', chatRoomId],
    queryFn: async ({ pageParam }) => {
      try {
        const response = await getChatHistory(chatRoomId, size, pageParam);
        return response.data;
      } catch (error) {
        console.error('채팅 히스토리 조회 실패:', error);
        throw error;
      }
    },
    getNextPageParam: lastPage => {
      if (!lastPage.hasNext) return undefined;
      return lastPage.lastSendAt;
    },
    initialPageParam: undefined,
    select: data => ({
      pages: data.pages,
      pageParams: data.pageParams,
      // 모든 채팅 메시지를 하나의 배열로 합치기
      allChats: data.pages.flatMap(page => page.chats),
    }),
  });
};
export const useLeaveChatRoom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (chatRoomId: number) => leaveChatRoom(chatRoomId),
    onSuccess: async () => {
      // 채팅방 목록 쿼리 무효화하여 새로고침
      queryClient.invalidateQueries({ queryKey: ['chatRooms'] });
      // 성공 토스트 메시지
      await customToast({
        text: '채팅방에서 나갔습니다.',
        timer: 3000,
        icon: 'success',
      });
    },
    onError: async () => {
      await customToast({
        text: '채팅방 나가기에 실패했습니다.',
        timer: 3000,
        icon: 'error',
      });
    },
  });
};
