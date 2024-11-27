import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

import styles from './WriteStep.module.scss';

import type { Color, BaseArchiveDTO } from '@/features';
import { ColorMap, useCreateArchive, useArchiveStore } from '@/features';
import { Button, MarkdownEditor, Switch, Tag } from '@/shared/ui';

export const WriteStep = ({
  selectedColor,
  onClick,
  isEdit = false,
}: {
  selectedColor: Color;
  onClick: () => void;
  isEdit?: boolean;
}) => {
  const { archiveData: prevArchiveData } = useArchiveStore();
  const [tag, setTag] = useState<string>('');
  const [archiveData, setArchiveData] = useState<BaseArchiveDTO>(
    isEdit
      ? prevArchiveData
      : {
          title: '',
          description: '',
          type: selectedColor,
          canComment: false,
          tags: [],
          imageUrls: [{ url: 'https://source.unsplash.com/random/800x600' }],
        },
  );

  useEffect(() => {
    if (isEdit) {
      setArchiveData(prevArchiveData);
    }
  }, [isEdit, prevArchiveData]);

  const updateArchiveData = <T extends keyof BaseArchiveDTO>(key: T, value: BaseArchiveDTO[T]) => {
    setArchiveData(prev => ({ ...prev, [key]: value }));
  };

  const handleTagAddition = () => {
    if (tag.trim()) {
      updateArchiveData('tags', [...archiveData.tags, { content: tag }]);
      setTag('');
    }
  };

  const handleTagRemoval = (tagContent: string) => {
    const updatedTags = archiveData.tags.filter(t => t.content !== tagContent);
    updateArchiveData('tags', updatedTags);
  };

  const { mutate: createArchive } = useCreateArchive();

  return (
    <>
      <div className={styles.setting}>
        <div className={styles.settingWrapper}>
          <button onClick={onClick}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <div
            className={styles.color}
            style={{ backgroundColor: `${ColorMap[selectedColor].hex}` }}
          />
          <span>{ColorMap[selectedColor].name}</span>
        </div>
        <div className={styles.settingWrapper}>
          <span>댓글 허용</span>
          <Switch
            checked={archiveData.canComment}
            onChange={value => {
              updateArchiveData('canComment', value);
            }}
          />
        </div>
      </div>

      <div className={styles.inputContainer}>
        <label>제목</label>
        <div className={styles.inputBox}>
          <input
            onChange={e => {
              updateArchiveData('title', e.target.value);
            }}
            placeholder='스토리를 나타낼 제목을 입력해주세요'
            type='text'
            value={archiveData.title}
          />
        </div>
      </div>

      <MarkdownEditor
        markdownText={archiveData.description}
        updateArchiveData={(key, value) => {
          updateArchiveData(key, value);
        }}
      />

      <div className={styles.inputContainer}>
        <label>태그</label>
        <div className={styles.tags}>
          {archiveData.tags.map(tag => (
            <Tag key={tag.content} onRemove={handleTagRemoval} tag={tag} />
          ))}
        </div>
        <div className={styles.inputBox}>
          <input
            onChange={e => {
              setTag(e.target.value);
            }}
            onKeyDown={e => {
              if (e.key === 'Enter') handleTagAddition();
            }}
            placeholder='태그'
            type='text'
            value={tag}
          />
        </div>
      </div>

      <Button
        onClick={() => {
          createArchive(archiveData);
        }}
      >
        {isEdit ? '아카이브 수정' : '아카이브 등록'}
      </Button>
    </>
  );
};
