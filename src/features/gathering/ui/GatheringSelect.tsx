import type { Control } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import type { Props as SelectProps } from 'react-select';
import Select from 'react-select';

import styles from './GatheringSelect.module.scss';
import type { CreateGatheringRequest } from '../model/dto/request.dto';
import type { SelectOption, SelectOptNum } from '../model/types';

export type GatheringSelectProps = {
  name: keyof CreateGatheringRequest;
  label: string;
  options: SelectOption[] | SelectOptNum[];
  control: Control<CreateGatheringRequest>;
  isMulti?: boolean;
  placeholder?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  isNumber?: boolean;
} & Omit<SelectProps<SelectOption | SelectOptNum, boolean>, 'name' | 'options'>;

export const GatheringSelect = ({
  name,
  label,
  options,
  control,
  isMulti = false,
  placeholder = '선택해주세요',
  isRequired = false,
  isDisabled = false,
  isNumber = false,
  ...selectProps
}: GatheringSelectProps) => {
  return (
    <div className={styles.container}>
      <label className={styles.label}>
        {label}
        {isRequired && <span> *</span>}
      </label>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => (
          <div>
            <Select
              {...field}
              {...selectProps}
              className='react-select-container'
              classNamePrefix='react-select'
              isDisabled={isDisabled}
              isMulti={isMulti}
              onChange={newValue => {
                if (isMulti) {
                  const values = (newValue as SelectOption[])?.map(item => item.value) || [];
                  field.onChange(values);
                } else {
                  const value = (newValue as SelectOption | SelectOptNum)?.value || '';
                  // isNumber prop에 따라 숫자로 변환
                  field.onChange(isNumber ? Number(value) : value);
                }
              }}
              options={options}
              placeholder={placeholder}
              value={
                isMulti
                  ? options.filter(option =>
                      (field.value as (string | number)[])?.includes(option.value),
                    )
                  : options.find(option => option.value === field.value)
              }
            />
            {error && <p className={styles.error}>{error.message}</p>}
          </div>
        )}
        rules={{ required: isRequired && '필수 항목입니다' }}
      />
    </div>
  );
};
