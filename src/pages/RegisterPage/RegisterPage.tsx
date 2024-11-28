import { useState } from 'react';

import styles from './RegisterPage.module.scss';

import { JOIN_STAGES } from '@/features/auth/progress.type';
import { RegisterProgress } from '@/features/auth/ui/RegisterProgress';
import { PortfolioStep } from '@/widgets/RegisterUser/PortfolioStep';
import { ProfileStep } from '@/widgets/RegisterUser/ProfileStep';

const StepComponentList = [ProfileStep, PortfolioStep];

export const RegisterPage = () => {
  const [stage, setStage] = useState<number>(1);

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
