import { faChevronLeft, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

import styles from './WriteStep.module.scss';

import type { Color } from '@/features';
import { ColorMap, useCreateArchive } from '@/features';
import { Button, MarkdownEditor, Switch } from '@/shared/ui';

export const WriteStep = ({
  selectedColor,
  onClick,
}: {
  selectedColor: Color;
  onClick: () => void;
}) => {
  const [tag, setTag] = useState<string>('');
  const [archiveData, setArchiveData] = useState({
    title: '',
    description: '',
    type: selectedColor,
    canComment: false,
    tags: [],
    imageUrls: [{ url: 'https://source.unsplash.com/random/800x600' }],
  });

  const updateArchiveData = (
    key: string,
    value: string | boolean | { content: string }[] | { url: string }[],
  ) => {
    setArchiveData(prev => ({ ...prev, [key]: value }));
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
          if (value !== archiveData.description) {
            updateArchiveData(key, value);
          }
        }}
      />
      <div className={styles.inputContainer}>
        <label>태그</label>
        <div className={styles.tags}>
          {archiveData.tags.map((tag: { content: string }) => (
            <span className={styles.tag} key={tag.content}>
              {tag.content}
              <FontAwesomeIcon
                icon={faX}
                onClick={() => {
                  const updatedTags = archiveData.tags.filter(
                    (t: { content: string }) => t.content !== tag.content,
                  );
                  if (updatedTags !== archiveData.tags) {
                    updateArchiveData('tags', updatedTags);
                  }
                }}
                size='xs'
              />
            </span>
          ))}
        </div>
        <div className={styles.inputBox}>
          <input
            onChange={e => {
              setTag(e.target.value);
            }}
            onKeyDown={e => {
              if (e.key === 'Enter' && tag.trim()) {
                updateArchiveData('tags', [...archiveData.tags, { content: tag }]);
                setTag('');
              }
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
        아카이브 등록
      </Button>
    </>
  );
};
