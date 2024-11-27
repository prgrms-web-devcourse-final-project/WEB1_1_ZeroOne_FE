import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './CommentItem.module.scss';
import type { Comment } from '../archive.dto';
import { useDeleteComment } from '../archive.hook';

export const CommentItem = ({ comment, archiveId }: { comment: Comment; archiveId: number }) => {
  const { mutate: deleteComment } = useDeleteComment(archiveId);

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <p className={styles.name}>{comment.username}</p>
        {comment.isMine && (
          <div className={styles.editBtns}>
            <FontAwesomeIcon icon={faEdit} size='xs' />
            <FontAwesomeIcon
              icon={faTrash}
              onClick={() => {
                deleteComment({ commentId: comment.commentId });
              }}
              size='xs'
            />
          </div>
        )}
      </div>
      <p className={styles.content}>{comment.content}</p>
    </div>
  );
};
