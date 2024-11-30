interface GatheringInfoItemProps {
  label: string;
  value: string | number | string[];
}
import styles from './GatheringInfoItem.module.scss';
export const GatheringInfoItem = ({ label, value }: GatheringInfoItemProps) => {
  return (
    <li className={styles.infoItem}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{value}</span>
    </li>
  );
};
