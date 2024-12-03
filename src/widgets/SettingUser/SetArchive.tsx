import { useState } from 'react';

import styles from './SetArchive.module.scss';

import { ArchiveCard, type ArchiveCardDTO, type Color } from '@/features';
import { Button } from '@/shared/ui';

const dummyArchives: ArchiveCardDTO[] = Array.from({ length: 9 }, (_, i) => {
  const randomWidth = Math.floor(Math.random() * 100) + 200;
  const randomHeight = Math.floor(Math.random() * 100) + 200;
  return {
    archiveId: i,
    title: 'Sample Archive',
    introduction: 'Description for sample archive',
    type: ['RED', 'BLUE', 'GREEN', 'YELLOW', 'PURPLE'][Math.floor(Math.random() * 4)] as Color,
    username: '홍길동',
    likeCount: Math.floor(Math.random() * 100),
    isLiked: Math.random() > 0.5,
    thumbnail: `https://picsum.photos/${randomWidth}/${randomHeight}`,
    createDate: '2024-12-03',
  };
});

export const SetArchive = () => {
  const [archives, setArchives] = useState<ArchiveCardDTO[]>(dummyArchives);

  const [draggedItemId, setDraggedItemId] = useState<number | null>(null);

  const handleDragStart = (id: number) => {
    setDraggedItemId(id);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, id: number) => {
    e.preventDefault();

    if (draggedItemId === id) return;

    const draggedIndex = archives.findIndex(item => item.archiveId === draggedItemId);
    const targetIndex = archives.findIndex(item => item.archiveId === id);

    const updatedItems = [...archives];
    const [draggedItem] = updatedItems.splice(draggedIndex, 1);
    updatedItems.splice(targetIndex, 0, draggedItem);

    setArchives(updatedItems);
  };

  const handleDragEnd = () => {
    setDraggedItemId(null);
  };

  return (
    <>
      <div className={styles.wrapper}>
        {archives.map(archive => (
          <div
            className={styles.item}
            draggable
            key={archive.archiveId}
            onDragEnd={handleDragEnd}
            onDragOver={e => {
              handleDragOver(e, archive.archiveId);
            }}
            onDragStart={() => {
              handleDragStart(archive.archiveId);
            }}
          >
            <ArchiveCard archive={archive} />
          </div>
        ))}
      </div>
      <Button>드래그 앤 드롭으로 순서를 수정하고 이 버튼을 눌러주세요!</Button>
    </>
  );
};
