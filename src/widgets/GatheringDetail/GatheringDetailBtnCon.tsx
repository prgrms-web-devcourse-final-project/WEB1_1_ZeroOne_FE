import { useNavigate } from 'react-router-dom';

import styles from './GatheringDetailBtnCon.module.scss';

import { Button } from '@/shared/ui';
// interface GatheringDetailBtnConProps {}

export const GatheringDetailBtnCon = () =>
  // {}: GatheringDetailBtnConProps
  {
    const navigate = useNavigate();
    const handleGoBack = () => {
      navigate(-1);
    };
    return (
      <div className={styles.container}>
        <Button onClick={handleGoBack}>뒤로 가기</Button>
        <Button>연락하기</Button>
      </div>
    );
  };
