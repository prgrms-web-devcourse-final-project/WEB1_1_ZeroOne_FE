// import { useNavigate } from 'react-router-dom';

import styles from './GatheringDetailBtnCon.module.scss';

import { Button } from '@/shared/ui';

interface GatheringDetailBtnConProps {
  gatheringId?: string;
}

export const GatheringDetailBtnCon = ({ gatheringId }: GatheringDetailBtnConProps) => {
  // const navigate = useNavigate();
  console.log(gatheringId);
  return (
    <div className={styles.container}>
      <Button>수정하기</Button>
      <Button>삭제하기</Button>
      <Button>연락하기</Button>
    </div>
  );
};
