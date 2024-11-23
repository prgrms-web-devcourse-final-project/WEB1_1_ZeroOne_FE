import cn from 'classnames';

import styles from './ColorChips.module.scss';

import { ColorChip, ColorMap } from '@/features';

export const ColorChips = () => {
  return (
    <>
      <div className={cn(styles.container, styles.one)}>
        <ColorChip colors={ColorMap.red} onClick={() => {}} />
        <ColorChip colors={ColorMap.yellow} onClick={() => {}} />
        <ColorChip colors={ColorMap.blue} onClick={() => {}} />
      </div>
      <div className={cn(styles.container, styles.two)}>
        <ColorChip colors={ColorMap.green} onClick={() => {}} />
        <ColorChip colors={ColorMap.purple} onClick={() => {}} />
      </div>
    </>
  );
};
