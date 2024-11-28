import styles from './PortfolioCard.module.scss';
export const PortfolioCard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <a className={styles.cardImg}>
            <img alt='profileImg' />
          </a>
          <div className={styles.cardFooter}>
            <div>name</div>
            <div>직업</div>
            <div>한 줄 소개</div>
          </div>
        </div>
      </div>
    </div>
  );
};
