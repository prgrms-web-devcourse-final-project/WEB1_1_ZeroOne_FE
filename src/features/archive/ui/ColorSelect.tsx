import cn from 'classnames';

import styles from './ColorSelect.module.scss';
import { ColorMap, type Color } from '../colors.type';

export const ColorSelect = ({
  color,
  setColor,
}: {
  color: Color;
  setColor: (color: Color) => void;
}) => {
  const colors: Color[] = ['DEFAULT', 'RED', 'YELLOW', 'BLUE', 'GREEN', 'PURPLE'];

  return (
    <div className={styles.container}>
      {colors.map(c => (
        <div
          className={cn(styles.color, styles[ColorMap[c].label], {
            [styles.selected]: color === c,
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
