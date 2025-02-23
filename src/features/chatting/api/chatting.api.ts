import type { PostCreateChatRoomResponse } from './chatting.dto';
import type { ChatCategory } from './types';

import api from '@/shared/api/baseApi';

export const postCreateChatRoom = (chatCategory: ChatCategory, targetId: number) =>
  api
    .post<PostCreateChatRoomResponse>('/chat-room', { chatCategory, targetId })
    .then(res => res.data)
    .catch(error => {
      console.error('채팅방 생성 요청 실패:', error.response?.data);
      console.error('요청 데이터:', { chatCategory, targetId });
      throw error;
    });
export const getChatRoomList = () => api.get('/chat-room/me').then(res => res.data);
export const participateChatRoom = (chatRoomId: number) =>
  api
    .post<PostCreateChatRoomResponse>(`/chat-room/participation/${chatRoomId}`)
    .then(res => res.data);

export const getChatHistory = (chatRoomId: number, size: number = 3, lastSendAt?: string) => {
  const params = new URLSearchParams({
    size: size.toString(),
    ...(lastSendAt && { lastSendAt }),
  });

  return api.get(`/chat-room/chats/${chatRoomId}?${params}`).then(res => res.data);
};
export const leaveChatRoom = (chatRoomId: number) =>
  api.delete(`/chat-room/leave/${chatRoomId}`).then(res => res.data);
