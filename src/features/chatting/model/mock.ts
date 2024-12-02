import type { ChatListResponse } from '../api/types';
export const chatListDummyData: ChatListResponse = {
  data: {
    projects: [
      {
        chatRoomId: 1,
        partnerProfileImg: 'aaaaaa',
        partnerName: '조희정',
        recentlyChat: 'Hi',
        recentTime: '14:08',
      },
      {
        chatRoomId: 2,
        partnerProfileImg: 'aaaaaa',
        partnerName: '이훈일',
        recentlyChat: 'Hi',
        recentTime: '14:08',
      },
      {
        chatRoomId: 3,
        partnerProfileImg: 'aaaaaa',
        partnerName: '조천산',
        recentlyChat: 'Hi',
        recentTime: '14:08',
      },
      {
        chatRoomId: 4,
        partnerProfileImg: 'aaaaaa',
        partnerName: '채승규',
        recentlyChat: 'Hi',
        recentTime: '14:08',
      },
    ],
    meta: {
      size: 10,
      nextCursor: '98',
      hasNext: true,
    },
  },
  timeStamp: '2024-11-18T12:28:48.175657',
};
