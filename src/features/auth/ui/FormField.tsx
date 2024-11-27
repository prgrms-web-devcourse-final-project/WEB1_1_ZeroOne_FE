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
  const { control } = useFormContext<FormValues>();
  const { append, remove, fields } = useFieldArray({ name, control });

  return (
    <div className={styles.arrayInputWrapper}>
      {fields.map((field, index) => (
        <div className={styles.inputPart}>
          <Controller
            control={control}
            key={field.id}
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
      ))}
      <button
        className={styles.btn}
        onClick={() => {
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
    return (
      <div className={styles.formInputWrapper}>
        <div className={styles.formInput}>
          <label htmlFor={name}>{label}</label>
          {name === 'url' ? (
            <ArrayInputField name={name} {...restProps} />
          ) : (
            <InputField name={name} type={type} {...restProps} />
          )}
          {required && <FontAwesomeIcon icon={faCircleExclamation} />}
        </div>
        {/* <span className={styles.errorMessage}>
          <FontAwesomeIcon icon={faX} />
          비밀번호를 다시 입력해주세요.
        </span> */}
      </div>
    );
  },
);
