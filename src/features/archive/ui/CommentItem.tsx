import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './CommentItem.module.scss';
import type { Comment } from '../archive.dto';

export const CommentItem = ({ comment }: { comment: Comment }) => {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <p className={styles.name}>{comment.username}</p>
        {comment.isMine && (
          <div className={styles.editBtns}>
            <FontAwesomeIcon icon={faEdit} size='xs' />
            <FontAwesomeIcon icon={faTrash} size='xs' />
          </div>
        )}
      </div>
      <p className={styles.content}>{comment.content}</p>
    </div>
  );
};
