import styles from './Switch.module.scss';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  defaultChecked?: boolean;
  disabled?: boolean;
}

export const Switch = ({ checked, onChange, defaultChecked, disabled }: SwitchProps) => {
  return (
    <label className={styles.switch}>
      <input
        checked={defaultChecked || checked}
        disabled={disabled || false}
        onChange={() => {
          onChange(!checked);
        }}
        type='checkbox'
      />
      <span className={styles.slider}></span>
    </label>
  );
};
