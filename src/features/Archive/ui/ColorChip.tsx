import type { ColorInfo } from '../colors.type';
import styles from './ColorChip.module.scss';

import ColorChipLogo from '@/shared/assets/color-chip-logo.svg';

export const ColorChip = ({ colors, onClick }: { colors: ColorInfo; onClick: () => void }) => {
  return (
    <section className={styles.wrapper} onClick={onClick}>
      <div className={styles.chip} style={{ backgroundColor: colors.hex }}>
        <img alt='color-chip-logo' src={ColorChipLogo} />
      </div>
      <div className={styles.description}>
        <h3>{colors.name}</h3>
        <p>{colors.description}</p>
        <p>{colors.tag}</p>
      </div>
    </section>
  );
};
