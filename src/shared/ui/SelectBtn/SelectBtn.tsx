import cn from 'classnames';
import { useState } from 'react';
import type { ActionMeta, MultiValue, SingleValue } from 'react-select';
import Select from 'react-select';

import styles from './SelectBtn.module.scss';

type Option = {
  value: string;
  label: string;
};

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
  isDisabled?: boolean; // Select 전체 비활성화
  isSearchable?: boolean; // 검색 기능 활성화/비활성화
  isClearable?: boolean; // clear 버튼 표시 여부
  maxMenuHeight?: number; // 드롭다운 메뉴 최대 높이
  menuPlacement?: 'auto' | 'bottom' | 'top'; // 메뉴 위치
  noOptionsMessage?: string; // 옵션이 없을 때 메시지
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
    isMulti ? [] : null,
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
      value={value ?? selectedValue}
    />
  );
};
