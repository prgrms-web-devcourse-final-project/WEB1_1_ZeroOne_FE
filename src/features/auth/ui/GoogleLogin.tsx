import styles from './GoogleLogin.module.scss';

import GoogleLogo from '@/shared/assets/googleLogo.svg?react';
import { Button } from '@/shared/ui';

export const GoogleLogin = () => {
  return (
    <Button className={styles.loginBtn} skin='invert'>
      <div>
        <GoogleLogo width={64} />
        Log In
      </div>
    </Button>
  );
};