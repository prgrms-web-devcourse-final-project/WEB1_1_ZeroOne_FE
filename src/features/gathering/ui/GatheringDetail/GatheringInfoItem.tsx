interface GatheringInfoItemProps {
  label: string;
  value: string | number | string[];
}

import styles from './GatheringInfoItem.module.scss';

const isValidUrl = (str: string) => {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
};

export const GatheringInfoItem = ({ label, value }: GatheringInfoItemProps) => {
  const renderValue = (val: string | number) => {
    if (typeof val === 'string' && isValidUrl(val)) {
      return (
        <a className={styles.link} href={val} rel='noopener noreferrer' target='_blank'>
          {val}
        </a>
      );
    }
    return <span className={styles.value}>{val}</span>;
  };

  return (
    <li className={styles.infoItem}>
      <span className={styles.label}>{label}</span>
      {Array.isArray(value) ? (
        <div>
          {value.map((tag, index) => (
            <span className={styles.value} key={index}>
              {index === value.length - 1 ? tag : tag + ','}
            </span>
          ))}
        </div>
      ) : (
        renderValue(value)
      )}
    </li>
  );
};
