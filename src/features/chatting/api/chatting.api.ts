import type { PostCreateChatRoomResponse } from './chatting.dto';

import type { NotificationType } from '@/features/notification/notification.type';
import api from '@/shared/api/baseApi';

export const postCreateChatRoom = (chatCategory: NotificationType, targetId: number) =>
  api
    .post<PostCreateChatRoomResponse>('/chat-room', { chatCategory, targetId })
    .then(res => res.data);
