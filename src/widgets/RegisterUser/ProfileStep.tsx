import type React from 'react';

import styles from './ProfileStep.module.scss';

import { ProfileForm, formConfig } from '@/features/auth';
import { Button } from '@/shared/ui';

interface ProfileStepProps {
  setStage: React.Dispatch<React.SetStateAction<number>>;
}

export const ProfileStep = ({ setStage }: ProfileStepProps) => {
  return (
    <div className={styles.profileContainer}>
      <h3 className={styles.sectionTitle}>유저 프로필 등록</h3>
      <ProfileForm
        formConfig={formConfig}
        onSubmit={data => {
          console.log(data);
          setStage(prev => prev + 1);
        }}
      />
      <div className={styles.btnsWrapper}>
        <Button form='profile-form' type='submit'>
          다음
        </Button>
      </div>
    </div>
  );
};
