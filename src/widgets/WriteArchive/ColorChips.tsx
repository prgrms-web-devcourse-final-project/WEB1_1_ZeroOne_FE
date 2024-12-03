import cn from 'classnames';

import styles from './ColorChips.module.scss';

import type { Color } from '@/features';
import { ColorChip, ColorMap, ColorData } from '@/features';

export const ColorChips = ({
  selectedColor,
  onSelectColor,
}: {
  selectedColor: Color;
  onSelectColor: (color: Color) => void;
}) => {
  const handleChipClick = (colorName: Color) => {
    onSelectColor(colorName);
  };

  return (
    <>
      {ColorData.map(({ group, colors }: { group: string; colors: Color[] }) => (
        <div className={cn(styles.container, styles[group])} key={group}>
          {colors.map(colorKey => (
            <ColorChip
              colors={ColorMap[colorKey]}
              isSelected={selectedColor === colorKey}
              key={colorKey}
              onClick={() => {
                handleChipClick(colorKey);
              }}
            />
          ))}
        </div>
      ))}
    </>
  );
};
