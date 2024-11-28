import { useNavigate } from 'react-router-dom';

import styles from './PortfolioStep.module.scss';

import { PortfolioInput, usePortfolioInput } from '@/features/auth';
import { Button } from '@/shared/ui';

interface PortfolioStepProps {
  setStage: React.Dispatch<React.SetStateAction<number>>;
}

export const PortfolioStep = ({ setStage }: PortfolioStepProps) => {
  const { portfolioUrl, error, handleInputChange, validate } = usePortfolioInput();
  const navigate = useNavigate();

  return (
    <div className={styles.portfolioContainer}>
      <div className={styles.portfolioContent}>
        <h3 className={styles.sectionTitle}>
          포트폴리오 링크를 <br />
          아래에 입력해주세요.
        </h3>
        <span className={styles.subTitle}>
          자신의 색을 잘 드러낼 수 있는 포트폴리오를 소개해주세요
        </span>
        <PortfolioInput error={error} handleInputChange={handleInputChange} value={portfolioUrl} />
      </div>
      <div className={styles.btnsWrapper}>
        <Button
          onClick={() => {
            if (!validate(portfolioUrl)) return;

            /** 포트폴리오 등록 API */

            /** 나만의 색깔 찾기 페이지 구현 시 해당 페이지로 이동 */

            /** 임시, 메인으로 이동 */
            setStage(2); // error 방지용 의미 없는 코드
            alert('회원가입을 완료했습니다!');
            navigate('/');
          }}
        >
          다음
        </Button>
        <Button
          onClick={() => {
            navigate('/');
          }}
        >
          나중에 하기
        </Button>
      </div>
    </div>
  );
};
