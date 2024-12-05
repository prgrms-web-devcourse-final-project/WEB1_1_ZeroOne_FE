import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './RegisterPage.module.scss';

import { RegisterProgress, JOIN_STAGES } from '@/features/auth';
import { useRoleGuard } from '@/shared/hook/useRoleGuard';
import { ProfileStep, PortfolioStep } from '@/widgets/RegisterUser';

const StepComponentList = [ProfileStep, PortfolioStep];

export const RegisterPage = () => {
  const navigate = useNavigate();
  useRoleGuard({
    requiredRoles: ['REAL_NEWBIE', 'JUST_NEWBIE'],
    onAccessDenied: () => {
      navigate('/');
    },
  });
  const [stage, setStage] = useState<number>(2);

  const StepComponent = StepComponentList[stage - 1];

  return (
    <section className={styles.container}>
      <header className={styles.sectionHeader}>
        <h2>회원가입</h2>
        <RegisterProgress currentStage={stage} joinStages={JOIN_STAGES} />
      </header>

      <div className={styles.sectionContent}>{<StepComponent setStage={setStage} />}</div>
    </section>
  );
};
