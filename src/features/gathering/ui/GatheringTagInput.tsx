import cn from 'classnames';
import type { KeyboardEvent } from 'react';
import { useState } from 'react';
import { Controller } from 'react-hook-form';
import type { Control } from 'react-hook-form';

import styles from './GatheringTagInput.module.scss';
import type { GatheringFormData } from '../model/types';

export interface GatheringTagInputProps {
  control: Control<GatheringFormData>;
  name: 'gatheringTag';
  label: string;
  isRequired?: boolean;
  placeholder?: string;
}

type HandleChangeFunction = (value: string[]) => void;

export const GatheringTagInput = ({
  control,
  name,
  label,
  isRequired = false,
  placeholder = '태그를 입력해주세요',
}: GatheringTagInputProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    onChange: HandleChangeFunction,
    currentValue: string[],
  ) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      if (currentValue.length >= 3) {
        return;
      }
      if (!currentValue.includes(inputValue.trim())) {
        onChange([...currentValue, inputValue.trim()]);
      }
      setInputValue('');
    }
  };

  const removeTag = (
    tagToRemove: string,
    onChange: HandleChangeFunction,
    currentValue: string[],
  ) => {
    onChange(currentValue.filter(tag => tag !== tagToRemove));
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
        render={({ field: { onChange, value = [] }, fieldState: { error } }) => (
          <div>
            <div className={styles.tagsContainer}>
              {Array.isArray(value) &&
                value.map((tag: string) => (
                  <span className={styles.tag} key={tag}>
                    {tag}
                    <button
                      className={styles.removeButton}
                      onClick={() => {
                        removeTag(tag, onChange, value);
                      }}
                      type='button'
                    >
                      ×
                    </button>
                  </span>
                ))}
            </div>
            <input
              className={cn(styles.input, {
                [styles.error]: error,
              })}
              disabled={value.length >= 3}
              onChange={e => {
                setInputValue(e.target.value);
              }}
              onKeyDown={e => {
                handleKeyDown(e, onChange, value || []);
              }}
              placeholder={value.length >= 3 ? '태그는 최대 3개까지 입력 가능합니다' : placeholder}
              type='text'
              value={inputValue}
            />
            <p className={styles.hint}>{`태그 ${value.length}/3`}</p>
            {error && <p className={styles.errorMessage}>{error.message}</p>}
          </div>
        )}
        rules={{ required: isRequired && '태그를 입력해주세요' }}
      />
    </div>
  );
};
