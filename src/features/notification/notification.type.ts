import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faCoffee, faComment, faHeart, faUsers } from '@fortawesome/free-solid-svg-icons';

export type NotificationType = 'LIKE' | 'MENTORING' | 'FEEDBACK' | 'GATHERING' | 'COFFEE_CHAT';

export interface NotificationItem {
  icon: IconProp;
  label: string;
  title: string;
  description: string;
}

export const NotificationMap: { [key in NotificationType]: NotificationItem } = {
  LIKE: {
    icon: faHeart,
    label: 'like',
    title: '좋아요 알림',
    description: '좋아요를 받았습니다.',
  },
  FEEDBACK: {
    icon: faComment,
    label: 'feedback',
    title: '피드백 알림',
    description: '피드백을 요청 받았습니다.',
  },
  GATHERING: {
    icon: faUsers,
    label: 'gathering',
    title: '모임 알림',
    description: '게더링 초대를 받았습니다.',
  },
  COFFEE_CHAT: {
    icon: faCoffee,
    label: 'coffee',
    title: '커피챗 알림',
    description: '커피챗 요청을 받았습니다.',
  },
  MENTORING: {
    // 추가
    icon: faComment, // 적절한 아이콘으로 변경 가능
    label: 'mentoring',
    title: '멘토링 알림',
    description: '멘토링 요청을 받았습니다.',
  },
};
