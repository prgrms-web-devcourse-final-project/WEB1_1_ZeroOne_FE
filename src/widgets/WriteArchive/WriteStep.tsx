import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
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
  const [isPrivate, setIsPrivate] = useState(false);
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
          <Switch checked={isPrivate} onChange={setIsPrivate} />
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
        <div className={styles.inputBox}>
          <input placeholder='태그' type='text' />
        </div>
      </div>
      <Button>아카이브 등록</Button>
    </>
  );
};
