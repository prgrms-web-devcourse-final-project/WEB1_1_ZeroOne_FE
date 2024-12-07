interface GatheringInfoItemProps {
  label: string;
  value: string | number | string[];
}
import styles from './GatheringInfoItem.module.scss';
export const GatheringInfoItem = ({ label, value }: GatheringInfoItemProps) => {
  return (
    <li className={styles.infoItem}>
      <span className={styles.label}>{label}</span>
      {value instanceof Array ? (
        <div>
          {value.map((tag, index) => (
            <span className={styles.value} key={index}>
              {index === value.length - 1 ? tag : tag + ','}
            </span>
          ))}
        </div>
      ) : (
        <span className={styles.value}>{value}</span>
      )}
    </li>
  );
};
