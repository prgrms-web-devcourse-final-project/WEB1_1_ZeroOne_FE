//library

import cn from 'classnames';
import React, { useState } from 'react';
import type { ControllerRenderProps } from 'react-hook-form';
import Select from 'react-select';
import type { ActionMeta, MultiValue, SingleValue } from 'react-select';

//styles
import styles from './FormInputs.module.scss';
//types
import type { FormValues, InputFieldProps, Option } from '../form.types';

//components
import { Input, Radio, TextArea } from '@/shared/ui';

interface InputProps {
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  placeholder?: string;
}

interface RadioGroupProps {
  options: Option[];
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
}

interface TextAreaProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  maxLength?: number;
  placeholder?: string;
}

interface SelectInputProps {
  value: Option;
  options: Option[];
  onChange: (
    newValue: MultiValue<Option> | SingleValue<Option>,
    actionMeta: ActionMeta<Option>,
  ) => void;
  placeholder?: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ name, value, onChange, options }) => {
  return (
    <div className={cn(styles.input, styles.radioGroup)}>
      {options.map((option, idx) => (
        <React.Fragment key={option.value}>
          <Radio
            defaultChecked={value === option.value}
            id={`${name}${idx}`}
            labelText={option.label}
            name={name}
            onChange={onChange}
            value={option.value}
          />
        </React.Fragment>
      ))}
    </div>
  );
};

const DefaultInput: React.FC<InputProps> = ({ name, value, onChange, placeholder }) => {
  return (
    <Input
      className={styles.input}
      id={name}
      onChange={onChange}
      placeholder={placeholder}
      spellCheck='false'
      value={value}
    />
  );
};

const SelectInput: React.FC<SelectInputProps> = ({ options, value, onChange, placeholder }) => {
  return (
    <Select
      className={styles.input}
      onChange={onChange}
      options={options}
      placeholder={placeholder}
      value={value}
    />
  );
};

const TextInput: React.FC<TextAreaProps> = ({ name, value, onChange, maxLength, placeholder }) => {
  const resizeAreaSize = (target: EventTarget & HTMLTextAreaElement) => {
    target.style.height = 'auto';
    target.style.height = `${target.scrollHeight}px`;
  };

  const validateAreaLength = (target: EventTarget & HTMLTextAreaElement) => {
    if (maxLength && target.value.length >= maxLength) {
      target.value = target.value.slice(0, maxLength);
    }
  };

  return (
    <div className={cn(styles.textarea, styles.input)}>
      <TextArea
        id={name}
        onChange={e => {
          validateAreaLength(e.target);
          resizeAreaSize(e.target);

          onChange(e);
        }}
        placeholder={placeholder}
        spellCheck='false'
        value={value}
      />
      {maxLength && <span>{`${value.length}/${maxLength}`}</span>}
    </div>
  );
};

const ImageInput = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    console.log(file);

    if (selectedFile) {
      // 로컬 이미지 미리 보기 설정
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);

      // 업로드할 파일 설정
      setFile(selectedFile);
    }
  };

  const deleteProfileImage = () => {
    setPreview(null);
  };

  const previewImage = preview ?? 'defaultImage';

  return (
    <div className={cn(styles.imageInputWrapper)}>
      <img alt='profile-img' src={previewImage} />
      <div className={styles.inputBtns}>
        <input id='profile-upload' onChange={handleFileChange} type='file' />
        <label htmlFor='profile-upload'>Upload</label>
        <span onClick={deleteProfileImage}>Delete</span>
      </div>
    </div>
  );
};

export const RenderInput = ({
  field,
  type,
  ...restProps
}: Omit<InputFieldProps, 'name'> & {
  field: ControllerRenderProps<FormValues>;
}) => {
  switch (type) {
    case 'radio':
      return (
        <RadioGroup
          name={field.name}
          onChange={field.onChange}
          options={restProps.options ?? []}
          value={field.value as string}
        />
      );
    case 'select':
      return (
        <SelectInput
          onChange={field.onChange}
          options={restProps.options ?? []}
          value={field.value as Option}
          {...restProps}
        />
      );
    case 'textarea':
      return (
        <TextInput
          name={field.name}
          onChange={field.onChange}
          value={field.value as string}
          {...restProps}
        />
      );
    case 'image':
      return <ImageInput />;
    case 'array':
    default:
      return (
        <DefaultInput
          name={field.name}
          onChange={field.onChange}
          value={field.value as string}
          {...restProps}
        />
      );
  }
};
