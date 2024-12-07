import cn from 'classnames';
import { useState } from 'react';
import type { ActionMeta, MultiValue, SingleValue } from 'react-select';
import Select from 'react-select';

import styles from './SelectBtn.module.scss';

import type { Option } from '@/shared/model/SelectBtnTypes';

type SelectBtnProps = {
  placeholder?: string;
  options: Option[];
  value?: SingleValue<Option> | MultiValue<Option>;
  onChange?: (
    newValue: MultiValue<Option> | SingleValue<Option>,
    actionMeta: ActionMeta<Option>,
  ) => void;
  className?: string;
  isMulti?: boolean;
  isDisabled?: boolean;
  isSearchable?: boolean;
  isClearable?: boolean;
  maxMenuHeight?: number;
  menuPlacement?: 'auto' | 'bottom' | 'top';
  noOptionsMessage?: string;
};

export const SelectBtn = ({
  placeholder = '선택하세요',
  options,
  value,
  onChange,
  className,
  isMulti = false,
  isDisabled = false,
  isSearchable = true,
  isClearable = true,
  maxMenuHeight = 300,
  menuPlacement = 'auto',
  noOptionsMessage = '옵션이 없습니다',
}: SelectBtnProps) => {
  const [selectedValue, setSelectedValue] = useState<SingleValue<Option> | MultiValue<Option>>(
    value ?? (isMulti ? [] : null),
  );

  const handleChange = (
    newValue: MultiValue<Option> | SingleValue<Option>,
    actionMeta: ActionMeta<Option>,
  ) => {
    setSelectedValue(newValue);
    onChange?.(newValue, actionMeta);
  };

  return (
    <Select
      className={cn(
        styles.select,
        {
          [styles.isMulti]: isMulti,
        },
        className,
      )}
      classNamePrefix='selectButton'
      isClearable={isClearable}
      isDisabled={isDisabled}
      isMulti={isMulti}
      isSearchable={isSearchable}
      maxMenuHeight={maxMenuHeight}
      menuPlacement={menuPlacement}
      noOptionsMessage={() => noOptionsMessage}
      onChange={handleChange}
      options={options}
      placeholder={placeholder}
      value={selectedValue}
    />
  );
};
