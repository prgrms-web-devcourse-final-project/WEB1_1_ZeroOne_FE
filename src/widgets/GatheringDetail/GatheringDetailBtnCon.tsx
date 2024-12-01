import styles from './GatheringDetailBtnCon.module.scss';

import { Button } from '@/shared/ui';
// interface GatheringDetailBtnConProps {}

export const GatheringDetailBtnCon = () =>
  // {}: GatheringDetailBtnConProps
  {
    return (
      <div className={styles.container}>
        <Button>뒤로 가기</Button>
        <Button>연락하기</Button>
      </div>
    );
  };
