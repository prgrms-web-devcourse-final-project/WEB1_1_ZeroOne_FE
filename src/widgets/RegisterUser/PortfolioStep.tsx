import { useNavigate } from 'react-router-dom';

import styles from './PortfolioStep.module.scss';

import { PortfolioInput, usePortfolioInput } from '@/features/auth';
import { useCreatePortfolio } from '@/features/portfolio/portfolio.hook';
import { useUserStore } from '@/features/user/model/user.store';
import { Button, customConfirm } from '@/shared/ui';

interface PortfolioStepProps {
  setStage: React.Dispatch<React.SetStateAction<number>>;
}

export const PortfolioStep = ({ setStage }: PortfolioStepProps) => {
  const { portfolioUrl, error, handleInputChange, validate } = usePortfolioInput();
  const { mutate: createPortfolio } = useCreatePortfolio();
  const { updateUserData } = useUserStore(state => state.actions);
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
            createPortfolio(
              {
                data: {
                  portfolioUrl,
                },
              },
              {
                onSuccess: () => {
                  // balance 게임 구현 시 stage 3으로 넘어가게 수정 예정
                  setStage(2);
                  updateUserData({
                    role: 'OLD_NEWBIE',
                  });
                  void customConfirm({
                    title: '유저 등록 완료',
                    text: '메인 페이지로 이동합니다.',
                    icon: 'info',
                    showCancelButton: false,
                  }).then(result => {
                    if (result.isConfirmed) {
                      navigate('/');
                    }
                  });
                },
                onError: () => {
                  void customConfirm({
                    title: '오류',
                    text: '포트폴리오 등록에 실패하셨습니다. 다시 시도해주세요.',
                    icon: 'error',
                  });
                },
              },
            );
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
