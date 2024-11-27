import styles from './WriteGatheringPage.module.scss';

import { customConfirm } from '@/shared/ui';
export const WriteGatheringPage = () => {
  const result = customConfirm({
    title: '내용 초기화',
    text: '작성 중인 내용을 초기화하시겠습니까?',
  });
  return <div className={styles.container}>WriteGatheringPage</div>;
};
