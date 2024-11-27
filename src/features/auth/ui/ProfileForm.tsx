import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import styles from './ProfileForm.module.scss';
import { JOB_CATEGORIES, type FormValues } from '../form.types';
import { FormField } from './FormField';
import { formConfig } from '../form.utils';

export const ProfileForm = () => {
  const [formStructure, setFormStructure] = useState(formConfig.structure);
  const method = useForm<FormValues>({
    resolver: yupResolver(formConfig.validation),
    mode: 'onChange',
    defaultValues: {
      name: '',
      briefIntro: '',
      majorJobGroup: null,
      minorJobGroup: null,
      jobTitle: '',
      division: 'student',
      url: [{ value: '' }],
      imageUrl: '',
    },
  });

  console.log('Error', method.formState.errors);
  console.log(method.watch());

  const onSubmit = (data: FormValues) => {
    console.log('폼 데이터:', data);
  };

  const majorJobGroup = method.watch('majorJobGroup');
  useEffect(() => {
    if (!majorJobGroup) return;
    setFormStructure(prev => {
      const updatedStructure = [...prev];
      for (let i = 0; i < updatedStructure.length; i++) {
        let findIdx;
        const { inputs } = updatedStructure[i];
        if ((findIdx = inputs.findIndex(input => input.name === 'minorJobGroup')) !== -1) {
          const minorJobGroup = [...JOB_CATEGORIES].find(
            category => category.value === majorJobGroup.value,
          )?.children;
          inputs[findIdx].options = minorJobGroup;
          inputs[findIdx].placeholder = '직무를 선택해 주세요.';
          break;
        }
      }
      return updatedStructure;
    });
    method.setValue('minorJobGroup', null, { shouldValidate: true });
  }, [majorJobGroup, method]);

  return (
    <FormProvider {...method}>
      <form className={styles.joinForm} onSubmit={method.handleSubmit(onSubmit)}>
        {formStructure.map(section => (
          <fieldset className={styles.formSection} key={section.title}>
            <legend>{section.title}</legend>
            {section.inputs.map(input => {
              return <FormField {...input} key={input.name} />;
            })}
          </fieldset>
        ))}
        <button type='submit'>dd</button>
      </form>
    </FormProvider>
  );
};
