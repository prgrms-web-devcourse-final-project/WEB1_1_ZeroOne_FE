import cn from 'classnames';

import styles from './ColorSelect.module.scss';
import type { Color } from '../colors.type';

export const ColorSelect = ({
  color,
  setColor,
}: {
  color: Color | 'default';
  setColor: (color: Color | 'default') => void;
}) => {
  const colors: (Color | 'default')[] = ['default', 'red', 'yellow', 'blue', 'green', 'purple'];

  return (
    <div className={styles.container}>
      {colors.map(c => (
        <div
          className={cn(styles.color, styles[c], {
            [styles.selected]: color === c || (color === null && c === 'default'),
          })}
          key={c}
          onClick={() => {
            setColor(c);
          }}
        />
      ))}
    </div>
  );
};
