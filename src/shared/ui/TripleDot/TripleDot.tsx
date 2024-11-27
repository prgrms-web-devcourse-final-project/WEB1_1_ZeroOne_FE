import cn from 'classnames';

import styles from './TripleDot.module.scss';

interface TripleDotProps {
  className?: string; // 외부 컨테이너 스타일링 props
  dotStyle?: string; // 외부 도트 스타일링 props
}

export const TripleDot = ({ className, dotStyle }: TripleDotProps) => {
  return (
    <div className={cn(styles.container, className)}>
      {Array.from({ length: 3 }).map((_, index) => (
        <div className={cn(styles.dot, dotStyle)} key={index}></div>
      ))}
    </div>
  );
};
