import { faChevronLeft, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

import styles from './WriteStep.module.scss';

import type { Color } from '@/features';
import { ColorMap } from '@/features';
import { Button, MarkdownEditor, Switch } from '@/shared/ui';

export const WriteStep = ({
  selectedColor,
  onClick,
}: {
  selectedColor: Color;
  onClick: () => void;
}) => {
  const [allowComments, setAllowComments] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [tag, setTag] = useState<string>('');

  const addTag = (tag: string) => {
    if (tags.includes(tag)) return;

    if (tag.trim() === '') return;
    setTags([...tags, tag]);
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

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
          <Switch checked={allowComments} onChange={setAllowComments} />
        </div>
      </div>
      <div className={styles.inputContainer}>
        <label>제목</label>
        <div className={styles.inputBox}>
          <input placeholder='스토리를 나타낼 제목을 입력해주세요' type='text' />
        </div>
      </div>
      <MarkdownEditor />
      <div className={styles.inputContainer}>
        <label>태그</label>
        {tags && (
          <div className={styles.tags}>
            {tags.map(tag => (
              <span className={styles.tag}>
                {tag}
                <FontAwesomeIcon
                  icon={faX}
                  onClick={() => {
                    removeTag(tag);
                  }}
                  size='xs'
                />
              </span>
            ))}
          </div>
        )}
        <div className={styles.inputBox}>
          <input
            onChange={e => {
              setTag(e.target.value);
            }}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                addTag(tag);
                setTag('');
              }
            }}
            placeholder='태그'
            type='text'
            value={tag}
          />
        </div>
      </div>
      <Button>아카이브 등록</Button>
    </>
  );
};
