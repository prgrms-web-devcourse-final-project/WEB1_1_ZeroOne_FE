import cn from 'classnames';
import { Controller } from 'react-hook-form';
import type { Control } from 'react-hook-form';

import styles from './GatheringTitleInput.module.scss';
import type { CreateGatheringRequest } from '../model/dto/request.dto';

export interface GatheringTitleInputProps {
  control: Control<CreateGatheringRequest>;
  name: 'title';
  label: string;
  isRequired?: boolean;
  placeholder?: string;
  maxLength?: number;
}

export const GatheringTitleInput = ({
  control,
  name,
  label,
  isRequired = false,
  placeholder = '제목을 입력해주세요',
  maxLength = 150,
}: GatheringTitleInputProps) => {
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
              maxLength={maxLength}
              onChange={onChange}
              placeholder={placeholder}
              type='text'
              value={value || ''}
            />
            <div className={styles.inputInfo}>
              <span className={styles.charCount}>
                {value?.length || 0}/{maxLength}
              </span>
              {error && <p className={styles.errorMessage}>{error.message}</p>}
            </div>
          </div>
        )}
        rules={{
          required: isRequired && '제목을 입력해주세요',
          maxLength: {
            value: maxLength,
            message: `제목은 ${maxLength}자 이내로 입력해주세요`,
          },
        }}
      />
    </div>
  );
};
