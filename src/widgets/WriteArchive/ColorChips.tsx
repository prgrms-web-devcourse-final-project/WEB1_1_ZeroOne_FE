import cn from 'classnames';

import styles from './ColorChips.module.scss';

import { ColorChip } from '@/features';

export const ColorChips = () => {
  return (
    <>
      <div className={cn(styles.container, styles.one)}>
        <ColorChip color='#ff5e5e' onClick={() => {}} />
        <ColorChip color='#ffe66b' onClick={() => {}} />
        <ColorChip color='#8ad0e2' onClick={() => {}} />
      </div>
      <div className={cn(styles.container, styles.two)}>
        <ColorChip color='#b5d681' onClick={() => {}} />
        <ColorChip color='#aa8abd' onClick={() => {}} />
      </div>
    </>
  );
};
