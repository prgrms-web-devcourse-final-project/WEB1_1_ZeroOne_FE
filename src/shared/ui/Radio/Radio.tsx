import cn from 'classnames';
import type { InputHTMLAttributes } from 'react';

import styles from './Radio.module.scss';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  labelText: string;
  id: string;
}

export const Radio = ({ labelText, className, id, ...restProps }: Props) => {
  return (
    <div className={styles.radioWrapper}>
      <input className={cn(className)} id={id} type='radio' {...restProps} />
      <label htmlFor={id}>
        <div className={styles.radioCheckBox} />
        <span>{labelText}</span>
      </label>
    </div>
  );
};
