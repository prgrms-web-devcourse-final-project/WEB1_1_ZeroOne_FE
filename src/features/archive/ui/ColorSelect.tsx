import cn from 'classnames';

import styles from './ColorSelect.module.scss';

export const ColorSelect = () => {
  return (
    <div className={styles.container}>
      <div className={cn(styles.color, styles.red)} />
      <div className={cn(styles.color, styles.yellow)} />
      <div className={cn(styles.color, styles.blue)} />
      <div className={cn(styles.color, styles.green)} />
      <div className={cn(styles.color, styles.purple)} />
    </div>
  );
};
