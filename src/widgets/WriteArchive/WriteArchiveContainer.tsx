import styles from './WriteArchiveContainer.module.scss';

export const WriteArchiveContainer = () => {
  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h1>아카이브 작성</h1>
        <p>어떤 색상의 아카이브를 작성할지 골라주세요</p>
      </div>
      <div className={styles.contents}></div>
    </section>
  );
};
