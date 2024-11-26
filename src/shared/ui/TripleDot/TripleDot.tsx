import styles from './TripleDot.module.scss';

export const TripleDot = () => {
  return (
    <div className={styles.container}>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
    </div>
  );
};
