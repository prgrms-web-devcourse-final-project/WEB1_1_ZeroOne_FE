import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './WriteStep.module.scss';

import type { Color, PostArchiveApiResponse } from '@/features';
import { ColorMap, useArchiveStore, useCreateArchive, useUpdateArchive } from '@/features';
import { Button, customToast, MarkdownEditor, ScrollToTop, Switch, Tag } from '@/shared/ui';

export const WriteStep = ({
  onClick,
  isEdit = false,
}: {
  selectedColor: Color;
  onClick: () => void;
  isEdit?: boolean;
}) => {
  const navigate = useNavigate();

  const { archiveData, archiveId, resetArchiveData, setArchiveId, updateArchiveData } =
    useArchiveStore();
  const [tag, setTag] = useState<string>('');

  const handleTagAddition = () => {
    if (tag.trim()) {
      updateArchiveData('tags', [...archiveData.tags, { tag: tag }]);
      setTag('');
    }
  };

  const handleTagRemoval = (tagContent: string) => {
    const updatedTags = archiveData.tags.filter(t => t.tag !== tagContent);
    updateArchiveData('tags', updatedTags);
  };

  const { mutate: createArchive } = useCreateArchive();
  const { mutate: updateArchive } = useUpdateArchive(archiveId);

  const handleEdit = () => {
    updateArchive(archiveData, {
      onSuccess: () => {
        resetArchiveData();
        navigate(`/archive/${archiveId}`);
        setArchiveId(0);
        customToast({ text: '아카이브가 수정되었어요!', timer: 3000, icon: 'success' }).catch(
          console.error,
        );
      },
    });
  };

  const handleCreate = () => {
    createArchive(archiveData, {
      onSuccess: (data: PostArchiveApiResponse) => {
        resetArchiveData();
        navigate(`/archive/${data.data?.archiveId}`);
        customToast({ text: '아카이브가 만들어졌어요!', timer: 3000, icon: 'success' }).catch(
          console.error,
        );
      },
    });
  };

  return (
    <>
      <ScrollToTop />
      <div className={styles.setting}>
        <div className={styles.settingWrapper}>
          <FontAwesomeIcon icon={faChevronLeft} onClick={onClick} />
          <div
            className={styles.color}
            style={{ backgroundColor: `${ColorMap[archiveData.colorType].hex}` }}
          />
          <span>{ColorMap[archiveData.colorType].name}</span>
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
      <div className={styles.inputContainer}>
        <label>한 줄 소개</label>
        <div className={styles.inputBox}>
          <input
            onChange={e => {
              updateArchiveData('introduction', e.target.value);
            }}
            placeholder='스토리를 나타낼 간단한 소개 글을 적어주세요'
            type='text'
            value={archiveData.introduction}
          />
        </div>
      </div>
      <MarkdownEditor data={archiveData} onUpdate={updateArchiveData} updateKey={'description'} />
      <div className={styles.inputContainer}>
        <label>태그</label>
        <div className={styles.tags}>
          {archiveData.tags.map(tag => (
            <Tag key={tag.tag} onRemove={handleTagRemoval} tag={tag} />
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
          if (isEdit) handleEdit();
          else handleCreate();
        }}
      >
        {isEdit ? '아카이브 수정' : '아카이브 등록'}
      </Button>
    </>
  );
};
