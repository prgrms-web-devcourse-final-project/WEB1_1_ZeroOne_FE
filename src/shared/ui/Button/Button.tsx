import cn from 'classnames';
import type { ButtonHTMLAttributes } from 'react';
import type React from 'react';

import styles from './Button.module.scss';

/*
 ** 필요한 버튼 Prop은 추가적으로 작성
 ** ex) size, radius, fontsize ... 등
 */

type ButtonSkins = 'primary' | 'invert';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  skin?: ButtonSkins;
  className?: string;
  type?: 'submit' | 'reset' | 'button';
}

export const Button = ({
  children,
  type = 'button',
  skin = 'primary',
  className,
  ...restProps
}: Props) => {
  return (
    <button className={cn(styles.btn, styles[skin], className)} type={type} {...restProps}>
      {children}
    </button>
  );
};
