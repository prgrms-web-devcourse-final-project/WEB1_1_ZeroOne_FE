import styles from './PortfolioInput.module.scss';

import { Input } from '@/shared/ui';

interface PortfolioInputProps {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
  value: string;
}

export const PortfolioInput = ({ handleInputChange, error, value }: PortfolioInputProps) => {
  return (
    <div className={styles.portfolioInput}>
      <Input onChange={handleInputChange} placeholder='https://' value={value} />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};
