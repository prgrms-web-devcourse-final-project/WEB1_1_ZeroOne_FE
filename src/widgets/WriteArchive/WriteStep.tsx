import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './WriteStep.module.scss';

import type { Color, PostArchiveApiResponse } from '@/features';
import { ColorMap, useArchiveStore, useCreateArchive, useUpdateArchive } from '@/features';
import {
  Button,
  customConfirm,
  customToast,
  MarkdownEditor,
  ScrollToTop,
  Switch,
  Tag,
} from '@/shared/ui';

export const WriteStep = ({
  onClick,
  isEdit = false,
}: {
  selectedColor: Color;
  onClick: () => void;
  isEdit?: boolean;
}) => {
  const navigate = useNavigate();
  const [isComposing, setIsComposing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { archiveData, archiveId, resetArchiveData, setArchiveId, updateArchiveData } =
    useArchiveStore();
  const [tag, setTag] = useState<string>('');

  const handleTagAddition = () => {
    if (tag.trim()) {
      const isDuplicate = archiveData.tags.some(existingTag => existingTag.tag === tag.trim());
      if (!isDuplicate) {
        updateArchiveData('tags', [...archiveData.tags, { tag: tag.trim() }]);
        setTag('');
      } else {
        customToast({ text: '이미 추가된 태그입니다.', timer: 3000, icon: 'info' }).catch(
          console.error,
        );
      }
    }
  };

  const handleTagRemoval = (tagContent: string) => {
    const updatedTags = archiveData.tags.filter(t => t.tag !== tagContent);
    updateArchiveData('tags', updatedTags);
  };

  const { mutate: createArchive } = useCreateArchive();
  const { mutate: updateArchive } = useUpdateArchive(archiveId);

  const handleValidate = () => {
    const missingFields: string[] = [];

    if (!archiveData.title) {
      missingFields.push('제목');
    }
    if (!archiveData.introduction) {
      missingFields.push('한 줄 소개');
    }
    if (!archiveData.description) {
      missingFields.push('본문');
    }

    if (missingFields.length > 0) {
      const missingMessage = `${missingFields.join(', ')}을(를) 입력해주세요.`;
      customConfirm({ text: missingMessage, icon: 'warning' }).catch(console.error);
      return false;
    }

    return true;
  };

  const handleEdit = () => {
    if (isLoading) return;
    if (!handleValidate()) return;

    setIsLoading(true);
    updateArchive(archiveData, {
      onSuccess: () => {
        resetArchiveData();
        navigate(`/archive/${archiveId}`);
        setArchiveId(0);
        customToast({ text: '아카이브가 수정되었어요!', timer: 3000, icon: 'success' });
      },
      onSettled: () => {
        setIsLoading(false);
      },
    });
  };

  const handleCreate = () => {
    if (isLoading) return;
    if (!handleValidate()) return;

    setIsLoading(true);
    createArchive(archiveData, {
      onSuccess: (data: PostArchiveApiResponse) => {
        resetArchiveData();
        navigate(`/archive/${data.data?.archiveId}`);
        customToast({ text: '아카이브가 만들어졌어요!', timer: 3000, icon: 'success' });
      },
      onSettled: () => {
        setIsLoading(false);
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
            onCompositionEnd={() => {
              setIsComposing(false);
            }}
            onCompositionStart={() => {
              setIsComposing(true);
            }}
            onKeyDown={e => {
              if (isComposing) return;
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
