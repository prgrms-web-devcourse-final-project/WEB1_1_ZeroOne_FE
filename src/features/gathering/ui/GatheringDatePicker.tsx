import { ko } from 'date-fns/locale';
import DatePicker from 'react-datepicker';
import type { Control } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';

import styles from './GatheringDatePicker.module.scss';
import type { GatheringFormData } from '../model/types';

export interface GatheringDatePickerProps {
  name: keyof GatheringFormData;
  label: string;
  control: Control<GatheringFormData>;
  isRequired?: boolean;
  placeholder?: string;
}

export const GatheringDatePicker = ({
  name,
  label,
  control,
  isRequired = false,
  placeholder = '날짜를 선택해주세요',
}: GatheringDatePickerProps) => {
  return (
    <Controller<GatheringFormData>
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const handleDateChange = (date: Date | null) => {
          if (date) {
            const formattedDate = new Date(date.setHours(0, 0, 0, 0)).toISOString().split('T')[0];
            onChange(formattedDate);
          } else {
            onChange('');
          }
        };

        const dateValue = value ? new Date(value as string) : null;

        return (
          <div className={styles.container}>
            <div className={styles.labelWrapper}>
              {label}
              {isRequired && <span className={styles.required}>*</span>}
            </div>

            <div className={styles.inputWrapper}>
              <DatePicker
                className={styles.datePicker}
                dateFormat='yyyy.MM.dd'
                locale={ko}
                onChange={handleDateChange}
                placeholderText={placeholder}
                selected={dateValue}
              />
              {error && <p className={styles.error}>{error.message}</p>}
            </div>
          </div>
        );
      }}
      rules={{
        required: isRequired && '날짜를 선택해주세요',
        validate: {
          futureDate: (value: string | string[]) => {
            if (!value || Array.isArray(value)) return true;
            const date = new Date(value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return date >= today || '오늘 이후의 날짜를 선택해주세요';
          },
        },
      }}
    />
  );
};
