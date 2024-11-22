import styles from './ColorChip.module.scss';

import ColorChipLogo from '@/shared/assets/color-chip-logo.svg';

export const ColorChip = ({ color, onClick }: { color: string; onClick: () => void }) => {
  return (
    <section className={styles.wrapper} onClick={onClick}>
      <div className={styles.chip} style={{ backgroundColor: color }}>
        <img alt='color-chip-logo' src={ColorChipLogo} />
      </div>
      <div className={styles.description}>
        <h3>빨강</h3>
        <p>색 설명</p>
        <p>태그</p>
      </div>
    </section>
  );
};
