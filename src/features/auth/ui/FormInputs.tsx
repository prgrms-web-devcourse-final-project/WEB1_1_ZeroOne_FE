//library

import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import type { ControllerRenderProps } from 'react-hook-form';
import Select from 'react-select';
import type { ActionMeta, MultiValue, SingleValue } from 'react-select';

//styles
import styles from './FormInputs.module.scss';
//types
import type {
  CommonInputAttribute,
  ImageField,
  InputFieldProps,
  Option,
} from '../model/form.types';

//components
import { Input, Radio, TextArea } from '@/shared/ui';

interface InputProps<T = string> extends CommonInputAttribute {
  value: T;
  onChange: (e: T) => void;
  name: string;
}

interface RadioGroupProps extends InputProps {
  options: Option[];
}

interface SelectInputProps extends Omit<InputProps<Option>, 'onChange'> {
  options: Option[];
  onChange: (
    newValue: MultiValue<Option> | SingleValue<Option>,
    actionMeta: ActionMeta<Option>,
  ) => void;
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
            onChange={e => {
              onChange(e.target.value);
            }}
            value={option.value}
          />
        </React.Fragment>
      ))}
    </div>
  );
};

const DefaultInput: React.FC<InputProps> = ({ name, value, onChange, ...restProps }) => {
  return (
    <Input
      className={styles.input}
      id={name}
      onChange={e => {
        onChange(e.target.value);
      }}
      spellCheck='false'
      value={value}
      {...restProps}
    />
  );
};

const SelectInput: React.FC<SelectInputProps> = ({
  name,
  options,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <Select
      className={styles.input}
      name={name}
      onChange={onChange}
      options={options}
      placeholder={placeholder}
      value={value}
    />
  );
};

const TextInput: React.FC<InputProps<string>> = ({
  name,
  value,
  onChange,
  maxLength,
  placeholder,
}) => {
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

          onChange(e.target.value);
        }}
        placeholder={placeholder}
        spellCheck='false'
        value={value}
      />
      {maxLength && <span>{`${value.length}/${maxLength}`}</span>}
    </div>
  );
};

const ImageInput: React.FC<InputProps<ImageField>> = ({ name, value, onChange }) => {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    setPreview(value.url);
  }, [value.url]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      // 로컬 이미지 미리 보기 설정
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);

      // 업로드할 파일 설정
      onChange({ ...value, file: selectedFile });
    }
  };

  const deleteProfileImage = () => {
    onChange({ ...value, file: null });
    setPreview(value.url);
  };

  const previewImage = preview ?? 'defaultImage';

  return (
    <div className={cn(styles.imageInputWrapper)}>
      <img alt='profile-img' src={previewImage} />
      <div className={styles.inputBtns}>
        <input id='profile-upload' name={name} onChange={handleFileChange} type='file' />
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
  field: ControllerRenderProps;
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
          name={field.name}
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
      return <ImageInput name={field.name} onChange={field.onChange} value={field.value} />;
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
