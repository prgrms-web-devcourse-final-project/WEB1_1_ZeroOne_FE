import { useState, useEffect } from 'react';

import styles from './Randing.module.scss';

import Logo from '@/shared/assets/paletteLogo.svg?react';

export const Randing = () => {
  const [gradient, setGradient] = useState<string>('radial-gradient(circle, #ff7eb3, #8e44ad)');

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX: x, clientY: y } = event;
      const width = window.innerWidth;
      const height = window.innerHeight;

      const xPercent = (x / width) * 100;
      const yPercent = (y / height) * 100;

      const color1 = `rgb(${255 - xPercent * 2.55}, ${xPercent * 2.55}, 255)`;
      const color2 = `rgb(${yPercent * 2.55}, 255, ${255 - yPercent * 2.55})`;

      const newGradient = `radial-gradient(circle at ${xPercent}% ${yPercent}%, ${color1}, ${color2})`;

      setGradient(newGradient);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.logoWrapper} style={{ background: gradient }}>
        <Logo className={styles.logo} height={100} />
      </div>
      <div className={styles.spot} style={{ background: gradient }} />
    </div>
  );
};
