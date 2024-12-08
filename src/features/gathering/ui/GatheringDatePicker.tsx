import cn from 'classnames';
import { ko } from 'date-fns/locale';
import DatePicker from 'react-datepicker';
import { Controller } from 'react-hook-form';
import type { Control } from 'react-hook-form';

import 'react-datepicker/dist/react-datepicker.css';
import styles from './GatheringDatePicker.module.scss';
import type { CreateGatheringRequest } from '../model/dto/request.dto';

export interface GatheringDatePickerProps {
  name: keyof CreateGatheringRequest;
  label: string;
  control: Control<CreateGatheringRequest>;
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
    <div className={styles.container}>
      <label className={styles.label}>
        {label}
        {isRequired && <span> *</span>}
      </label>
      <Controller
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

          return (
            <div>
              <div className={styles.datePickerWrapper}>
                <DatePicker
                  autoComplete='off'
                  className={cn(styles.datePicker, {
                    [styles.error]: error,
                  })}
                  dateFormat='yyyy-MM-dd'
                  isClearable
                  locale={ko}
                  minDate={new Date()}
                  onChange={handleDateChange}
                  placeholderText={placeholder}
                  selected={value && typeof value === 'string' ? new Date(value) : null}
                  showPopperArrow={false}
                  wrapperClassName={styles.innerWrapper}
                />
              </div>
              {error && <p className={styles.errorMessage}>{error.message}</p>}
            </div>
          );
        }}
        rules={{
          required: isRequired && '날짜를 선택해주세요',
          validate: {
            futureDate: (value: string | number | string[]) => {
              if (!value || Array.isArray(value)) return true;
              const date = new Date(value);
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              return date >= today || '오늘 이후의 날짜를 선택해주세요';
            },
          },
        }}
      />
    </div>
  );
};
