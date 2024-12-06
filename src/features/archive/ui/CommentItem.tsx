import { faCircleCheck, faCircleXmark, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

import styles from './CommentItem.module.scss';
import type { Comment } from '../archive.dto';
import { useDeleteComment, useUpdateComment } from '../archive.hook';

export const CommentItem = ({ comment, archiveId }: { comment: Comment; archiveId: number }) => {
  const [editedContent, setEditedContent] = useState(comment.content);
  const { mutate: deleteComment } = useDeleteComment(archiveId);
  const { mutate: editComment } = useUpdateComment(archiveId, comment.commentId, editedContent);
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className={styles.container}>
      {isEdit ? (
        <div className={styles.editWrapper}>
          <textarea
            className={styles.editArea}
            onChange={e => {
              setEditedContent(e.target.value);
            }}
            value={editedContent}
          />
          <div className={styles.editBtnsWrapper}>
            <FontAwesomeIcon
              className={styles.check}
              icon={faCircleCheck}
              onClick={() => {
                editComment({ content: editedContent });
                setIsEdit(false);
              }}
            />
            <FontAwesomeIcon
              className={styles.cancel}
              icon={faCircleXmark}
              onClick={() => {
                setIsEdit(false);
              }}
            />
          </div>
        </div>
      ) : (
        <>
          <div className={styles.info}>
            <div className={styles.userInfo}>
              <img alt='user profile' className={styles.profile} src={comment.userProfile} />
              <p className={styles.name}>{comment.username}</p>
            </div>
            {comment.isMine && (
              <div className={styles.editBtns}>
                <FontAwesomeIcon
                  className={styles.edit}
                  icon={faEdit}
                  onClick={() => {
                    setIsEdit(true);
                  }}
                />
                <FontAwesomeIcon
                  className={styles.trash}
                  icon={faTrash}
                  onClick={() => {
                    deleteComment({ commentId: comment.commentId });
                  }}
                />
              </div>
            )}
          </div>
          <p className={styles.content}>{comment.content}</p>
        </>
      )}
    </div>
  );
};
