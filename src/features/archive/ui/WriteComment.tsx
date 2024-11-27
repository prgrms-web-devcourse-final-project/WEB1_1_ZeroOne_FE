import styles from './WriteComment.module.scss';

import { Button } from '@/shared/ui';

export const WriteComment = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inputBox}>
        <textarea className={styles.input} placeholder='댓글을 작성하세요' />
        <Button className={styles.absolute}>댓글 등록</Button>
      </div>
    </div>
  );
};
