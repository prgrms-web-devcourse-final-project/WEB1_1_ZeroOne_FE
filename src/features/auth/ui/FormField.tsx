import {
  faCircleExclamation,
  faCircleMinus,
  faCirclePlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';

import styles from './FormField.module.scss';
import type { FormInputType, FormValues, FormValuesName, InputFieldProps } from '../form.types';
import { RenderInput } from './FormInputs';

interface ArrayInputFieldProps extends InputFieldProps {
  name: Extract<FormValuesName, 'url'>;
  type: Extract<FormInputType, 'array'>;
}

interface FormFieldProps extends InputFieldProps {
  label: string;
  required?: boolean;
}

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return <span className={styles.errorMessage}>{message}</span>;
};

//InpuField - 기본 input 필드 (radio, text ...)
const InputField: React.FC<InputFieldProps> = ({ type = 'default', name, ...restProps }) => {
  const { control } = useFormContext<FormValues>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => <RenderInput field={field} type={type} {...restProps} />}
    />
  );
};

//ArrayInputField - URL Input ( 여러 input 받는 필드 )
const ArrayInputField: React.FC<ArrayInputFieldProps> = ({ name, type, ...restProps }) => {
  const { control, formState, setError } = useFormContext<FormValues>();
  const { append, remove, fields } = useFieldArray({ name, control });

  const inputError = formState.errors[name];

  const appendUrlInput = () => {
    if (fields.length === 5) {
      setError('url', { message: 'URL은 최대 5개 까지 입력가능합니다.' });
      return;
    }

    append({ value: '' });
  };

  return (
    <div className={styles.arrayInputWrapper}>
      {fields.map((field, index) => (
        <div className={styles.urlInputWrapper} key={field.id}>
          <div className={styles.urlInput}>
            <Controller
              control={control}
              name={`${name}.${index}.value`}
              render={({ field }) => <RenderInput field={field} type={type} {...restProps} />}
            />
            <FontAwesomeIcon
              className={styles.iconBtn}
              icon={faCircleMinus}
              onClick={() => {
                remove(index);
              }}
            />
          </div>
          {inputError && inputError[index]?.value?.message && (
            <ErrorMessage message={inputError[index]?.value?.message ?? ''} />
          )}
        </div>
      ))}
      <button className={styles.addBtn} onClick={appendUrlInput} type='button'>
        <span>추가</span>
        <FontAwesomeIcon className={styles.iconBtn} icon={faCirclePlus} />
      </button>
    </div>
  );
};

export const FormField: React.FC<FormFieldProps> = React.memo(
  ({ name, label, required, type = 'default', ...restProps }) => {
    const { formState } = useFormContext<FormValues>();
    const errorMessage = formState.errors[name]?.message;

    return (
      <div className={styles.formInputWrapper}>
        <div className={styles.formInput}>
          <span>{label}</span>
          {type === 'array' && name === 'url' ? (
            <ArrayInputField name={name} type={type} />
          ) : (
            <InputField name={name} type={type} {...restProps} />
          )}
          {required && <FontAwesomeIcon icon={faCircleExclamation} />}
        </div>
        {errorMessage && <ErrorMessage message={errorMessage} />}
      </div>
    );
  },
);
