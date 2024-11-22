import type { ButtonHTMLAttributes } from 'react';
import type React from 'react';

import styles from './Button.module.scss';

/*
 ** 필요한 버튼 Prop은 추가적으로 작성
 ** ex) size, radius, fontsize ... 등
 */
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button = ({ children }: Props) => {
  return <button className={styles.btn}>{children}</button>;
};
