import styles from './Loader.module.scss';

export const Loader = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {Array.from({ length: 3 }).map((_, index) => (
          <div className={styles.dot} key={index}></div>
        ))}
      </div>
    </div>
  );
};
