import cn from 'classnames';
import type { TextareaHTMLAttributes } from 'react';

import styles from './TextArea.module.scss';

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

export const TextArea = ({ className, ...restProps }: Props) => {
  return (
    <div className={cn(styles.textAreaWrapper, className)}>
      <textarea {...restProps} />
    </div>
  );
};
