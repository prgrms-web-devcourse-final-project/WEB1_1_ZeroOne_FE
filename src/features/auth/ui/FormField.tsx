import {
  faCircleExclamation,
  faCircleMinus,
  faCirclePlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';

import styles from './FormField.module.scss';
import type { InputFieldProps } from '../form.types';
import { RenderInput } from './FormInputs';

interface ArrayInputFieldProps extends InputFieldProps {
  name: 'url';
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
export const InputField: React.FC<InputFieldProps> = ({ type = 'default', name, ...restProps }) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div className={styles.formInputWrapper}>
          <RenderInput field={field} type={type} {...restProps} />
          {error?.message && <ErrorMessage message={error.message} />}
        </div>
      )}
    />
  );
};

//ArrayInputField - URL Input ( 여러 input 받는 필드 )
export const UrlInputField: React.FC<ArrayInputFieldProps> = ({ name, ...restProps }) => {
  const {
    control,
    setError,
    formState: { errors },
  } = useFormContext();
  const { append, remove, fields } = useFieldArray({ name, control });

  const appendUrlInput = () => {
    if (fields.length === 5) {
      setError(name, { message: 'URL은 최대 5개 까지 입력가능합니다.' });
      return;
    }

    append({ value: '' });
  };

  return (
    <div className={styles.arrayInputWrapper}>
      {fields.map((field, index) => (
        <div className={styles.urlInputContainer} key={field.id}>
          <div className={styles.urlInputWrapper}>
            <Controller
              control={control}
              name={`${name}.${index}.value`}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <RenderInput field={field} type='default' {...restProps} />
                  {error?.message && <ErrorMessage message={error.message} />}
                </div>
              )}
            />
            <FontAwesomeIcon
              className={styles.iconBtn}
              icon={faCircleMinus}
              onClick={() => {
                remove(index);
              }}
            />
          </div>
          {errors[name]?.message && <ErrorMessage message={errors[name].message as string} />}
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
  ({ label, required, ...restProps }) => {
    return (
      <div className={styles.formFieldWrapper}>
        <div className={styles.formInput}>
          <span>{label}</span>
          {restProps.name === 'url' ? (
            <UrlInputField name={restProps.name} />
          ) : (
            <InputField {...restProps} />
          )}
          {required && <FontAwesomeIcon className={styles.require} icon={faCircleExclamation} />}
        </div>
      </div>
    );
  },
);
