import cn from 'classnames';
import type { InputHTMLAttributes } from 'react';

import styles from './Input.module.scss';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input = ({ className, ...restProps }: Props) => {
  return (
    <div className={cn(className, styles.inputWrapper, { [styles.disabled]: restProps.disabled })}>
      <input {...restProps} />
    </div>
  );
};
