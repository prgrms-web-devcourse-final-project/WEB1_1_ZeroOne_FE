import type { PostCreateChatRoomResponse } from './chatting.dto';
import type { ChatCategory } from './types';

import api from '@/shared/api/baseApi';

export const postCreateChatRoom = (chatCategory: ChatCategory, targetId: number) =>
  api
    .post<PostCreateChatRoomResponse>('/chat-room', { chatCategory, targetId })
    .then(res => res.data);

export const getChatRoomList = () => api.get('/chat-room/me').then(res => res.data);