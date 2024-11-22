import cn from 'classnames';

import styles from './ColorChip.module.scss';

import ColorChipLogo from '@/shared/assets/color-chip-logo.svg';

export const ColorChip = ({ color, onClick }: { color: string; onClick: () => void }) => {
  return (
    <section className={styles.wrapper} onClick={onClick}>
      <div className={cn(styles.chip, color)} style={{ backgroundColor: color }}>
        <img alt='color-chip-logo' src={ColorChipLogo} />
      </div>
    </section>
  );
};
