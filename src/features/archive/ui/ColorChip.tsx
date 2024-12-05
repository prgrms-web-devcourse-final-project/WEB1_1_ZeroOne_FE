import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';

import type { ColorInfo } from '../colors.type';
import styles from './ColorChip.module.scss';

import ColorChipLogo from '@/shared/assets/color-chip-logo.svg';

export const ColorChip = ({
  colors,
  isSelected,
  onClick,
}: {
  colors: ColorInfo;
  isSelected: boolean;
  onClick: () => void;
}) => {
  return (
    <section className={styles.wrapper} onClick={onClick}>
      <div className={styles.chip} style={{ backgroundColor: colors.hex }}>
        <img alt='color-chip-logo' src={ColorChipLogo} />
        <FontAwesomeIcon
          className={cn(styles.check, { [styles.selected]: isSelected })}
          icon={faCircleCheck}
        />
      </div>
      <div className={styles.description}>
        <h3>{colors.name}</h3>
        <p>{colors.description}</p>
        <p>{colors.tag}</p>
      </div>
    </section>
  );
};
