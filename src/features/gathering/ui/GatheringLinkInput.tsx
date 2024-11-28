import cn from 'classnames';
import { Controller } from 'react-hook-form';
import type { Control } from 'react-hook-form';

import styles from './GatheringLinkInput.module.scss';
import type { GatheringFormData } from '../model/types';

export interface GatheringLinkInputProps {
  control: Control<GatheringFormData>;
  name: 'url';
  label: string;
  isRequired?: boolean;
  placeholder?: string;
}

export const GatheringLinkInput = ({
  control,
  name,
  label,
  isRequired = false,
  placeholder = '링크를 입력해주세요',
}: GatheringLinkInputProps) => {
  const validateUrl = (url: string) => {
    if (!url) return true;
    try {
      new URL(url);
      return true;
    } catch {
      return '올바른 URL 형식이 아닙니다';
    }
  };

  return (
    <div className={styles.container}>
      <label className={styles.label}>
        {label}
        {isRequired && <span className={styles.required}>*</span>}
      </label>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <div>
            <input
              className={cn(styles.input, {
                [styles.error]: error,
              })}
              onChange={onChange}
              placeholder={placeholder}
              type='url'
              value={value || ''}
            />
            {error && <p className={styles.errorMessage}>{error.message}</p>}
          </div>
        )}
        rules={{
          required: isRequired && '링크를 입력해주세요',
          validate: validateUrl,
        }}
      />
    </div>
  );
};
