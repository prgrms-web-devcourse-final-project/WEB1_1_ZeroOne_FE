export interface ChatRoom {
  chatRoomId: number;
  partnerProfileImg: string;
  partnerName: string;
  recentlyChat: string;
  recentTime: string;
}

export interface Meta {
  size: number;
  nextCursor: string;
  hasNext: boolean;
}

export interface ChatListResponse {
  data: {
    projects: ChatRoom[];
    meta: Meta;
  };
  timeStamp: string;
}
