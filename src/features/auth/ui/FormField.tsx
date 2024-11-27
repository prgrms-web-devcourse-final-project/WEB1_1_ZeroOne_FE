import {
  faCircleExclamation,
  faCircleMinus,
  faCirclePlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';

import styles from './FormField.module.scss';
import type { FormArrayInputKey, FormInputType, FormValues, InputFieldProps } from '../form.types';
import { RenderInput } from './FormInputs';

interface ArrayInputFieldProps extends InputFieldProps {
  name: FormArrayInputKey;
  type?: FormInputType;
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

const ArrayInputField: React.FC<ArrayInputFieldProps> = ({ name, type, ...restProps }) => {
  const { control, formState } = useFormContext<FormValues>();
  const { append, remove, fields } = useFieldArray({ name, control });

  const inputError = formState.errors[name];

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
      <button
        className={styles.addBtn}
        onClick={() => {
          if (fields.length === 5) {
            return;
          }
          append({ value: '' });
        }}
        type='button'
      >
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

    console.log(errorMessage, name);
    return (
      <div className={styles.formInputWrapper}>
        <div className={styles.formInput}>
          <span>{label}</span>
          {name === 'url' ? (
            <ArrayInputField name={name} {...restProps} />
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
