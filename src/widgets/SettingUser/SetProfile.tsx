import styles from './SetProfile.module.scss';

import { ProfileForm, profileFormConfig } from '@/features/auth';
import { Button } from '@/shared/ui';

export const SetProfile = () => {
  return (
    <div className={styles.editProfileWrapper}>
      <ProfileForm
        formConfig={profileFormConfig}
        onSubmit={data => {
          console.log(data);
        }}
      />
      <Button form='profile-form' type='submit'>
        완료
      </Button>
    </div>
  );
};
