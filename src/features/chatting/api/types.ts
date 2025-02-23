export interface ChatRoom {
  chatRoomId: number;
  userId: number;
  username: string;
  profileImg: string;
}

export interface Meta {
  size: number;
  nextCursor: string;
  hasNext: boolean;
}

export interface ChatListResponse {
  data: {
    chatRooms: ChatRoom[];
  };
  timeStamp: string;
}
export type ChatCategory = 'MENTORING' | 'FEEDBACK' | 'GATHERING' | 'COFFEE_CHAT' | 'ETC';
export interface ChatMessage {
  content: string;
  imgUrls?: { imgUrl: string }[];
  chatRoomId: number;
  email: string;
  profileImg: string;
  sendAt: string;
}
