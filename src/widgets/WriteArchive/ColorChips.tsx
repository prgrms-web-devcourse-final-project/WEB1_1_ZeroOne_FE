import cn from 'classnames';
import { useState } from 'react';

import styles from './ColorChips.module.scss';

import type { Color } from '@/features';
import { ColorChip, ColorMap, ColorData } from '@/features';

export const ColorChips = () => {
  const [selectedChip, setSelectedChip] = useState<string | null>(null);

  const handleChipClick = (colorName: string) => {
    setSelectedChip(prev => (prev === colorName ? null : colorName));
  };

  return (
    <>
      {ColorData.map(({ group, colors }: { group: string; colors: Color[] }) => (
        <div className={cn(styles.container, styles[group])} key={group}>
          {colors.map(colorKey => (
            <ColorChip
              colors={ColorMap[colorKey]}
              isSelected={selectedChip === colorKey}
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
