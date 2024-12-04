import { useState, useEffect } from 'react';

import styles from './SetArchive.module.scss';

import { ArchiveCard, useMyArchiveList, type ArchiveCardDTO } from '@/features';
import { Button, Loader } from '@/shared/ui';

export const SetArchive = () => {
  const { data: myArchives, isLoading } = useMyArchiveList();

  const [archives, setArchives] = useState<ArchiveCardDTO[]>([]);

  useEffect(() => {
    if (myArchives?.data) {
      setArchives(myArchives.data.archives);
    }
  }, [myArchives]);

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

  if (!myArchives?.data || isLoading) {
    return <Loader />;
  }

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
