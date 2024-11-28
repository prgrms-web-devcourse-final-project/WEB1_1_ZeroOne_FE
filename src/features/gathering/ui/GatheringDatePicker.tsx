import { ko } from 'date-fns/locale';
import DatePicker from 'react-datepicker';
import { Controller } from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';
import type { Control } from 'react-hook-form';

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
    <div className='flex flex-col gap-2'>
      <label className='text-sm font-medium'>
        {label}
        {isRequired && <span className='text-red-500 ml-1'>*</span>}
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
              <DatePicker
                autoComplete='off'
                className={`w-full px-3 py-2 border rounded-md ${
                  error ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                dateFormat='yyyy-MM-dd'
                isClearable
                locale={ko}
                minDate={new Date()}
                onChange={handleDateChange}
                placeholderText={placeholder}
                selected={value && typeof value === 'string' ? new Date(value) : null}
                showPopperArrow={false}
                wrapperClassName='w-full'
              />
              {error && <p className='text-red-500 text-sm mt-1'>{error.message}</p>}
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
    </div>
  );
};
