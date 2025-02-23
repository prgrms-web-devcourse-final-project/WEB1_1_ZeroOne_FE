export interface PostCreateChatRoomResponse {
  data: number;
  timeStamp: string;
}
export interface ChatRequest {
  content: string;
  imgUrls?: {
    imgUrl: string;
  }[];
}

// 응답 형식
export interface ChatResponse {
  chatRoomId: number;
  email: string;
  profileImg: string;
  content: string;
  imgUrls?: {
    imgUrl: string;
  }[];
  sendAt: string;
}
