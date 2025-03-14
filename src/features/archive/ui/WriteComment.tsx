import { useState } from 'react';

import { useCreateComment } from '../archive.hook';
import styles from './WriteComment.module.scss';

import { useUserStore } from '@/features/user/model/user.store';
import { Button } from '@/shared/ui';

export const WriteComment = ({ archiveId }: { archiveId: number }) => {
  const { mutate: createComment } = useCreateComment(archiveId);
  const { userData } = useUserStore();

  const [content, setContent] = useState('');

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputBox}>
        <textarea
          className={styles.input}
          onChange={e => {
            setContent(e.target.value);
          }}
          placeholder='댓글을 작성하세요'
          value={content}
        />
        <Button
          className={styles.absolute}
          onClick={() => {
            createComment({
              content: content,
              username: userData?.name ?? '',
              userProfile: userData?.imageUrl ?? '',
            });
            setContent('');
          }}
        >
          댓글 등록
        </Button>
      </div>
    </div>
  );
};
