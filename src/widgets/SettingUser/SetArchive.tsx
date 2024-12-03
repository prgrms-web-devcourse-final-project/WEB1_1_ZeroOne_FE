import { ArchiveGrid } from '../ArchiveGrid';

import type { ArchiveCardDTO, Color } from '@/features';
const dummyArchives: ArchiveCardDTO[] = Array.from({ length: 9 }, (_, i) => ({
  archiveId: i,
  title: `Sample Archive`,
  introduction: `Description for sample archive`,
  type: ['RED', 'BLUE', 'GREEN', 'YELLOW', 'PURPLE'][Math.floor(Math.random() * 4)] as Color,
  username: '홍길동',
  likeCount: Math.floor(Math.random() * 100),
  isLiked: Math.random() > 0.5,
  thumbnail: 'https://picsum.photos/300/200',
  createDate: new Date(),
}));
export const SetArchive = () => {
  return <ArchiveGrid archives={dummyArchives} />;
};
