import cn from 'classnames';

import styles from './UserBanner.module.scss';
import type { User } from '../user.dto';

interface UserBannerProps {
  isLoading: boolean;
  data?: User;
}

export const UserBanner = ({ isLoading, data }: UserBannerProps) => {
  if (isLoading || !data) {
    return <div className={cn(styles.userBanner, styles['default'])} />;
  }

  const mainColor = data.color.toLocaleLowerCase();

  return <div className={cn(styles.userBanner, styles[mainColor])} />;
};
