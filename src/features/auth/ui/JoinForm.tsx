import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import styles from './JoinForm.module.scss';
import type { MajorJobType } from '../form.types';
import { FORM_CONFIG, JOB_CATEGORIES, type FormValues } from '../form.types';
import { FormField } from './FormField';

export const JoinForm = () => {
  const [formStructure, setFormStructure] = useState(FORM_CONFIG.structure);
  const method = useForm<FormValues>({
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

  const majorJobGroup = method.watch('majorJobGroup');
  useEffect(() => {
    if (!majorJobGroup) return;
    setFormStructure(prev => {
      const updatedStructure = [...prev];
      for (let i = 0; i < updatedStructure.length; i++) {
        let findIdx;
        const { inputs } = updatedStructure[i];
        if ((findIdx = inputs.findIndex(input => input.name === 'minorJobGroup')) !== -1) {
          inputs[findIdx].options = JOB_CATEGORIES[majorJobGroup.value as MajorJobType].map(
            minorJobGroup => ({
              value: minorJobGroup,
              label: minorJobGroup,
            }),
          );
          inputs[findIdx].placeholder = '직무를 선택해 주세요.';
          break;
        }
      }
      return updatedStructure;
    });
    method.setValue('minorJobGroup', null);
  }, [majorJobGroup, method]);

  return (
    <FormProvider {...method}>
      <form className={styles.joinForm}>
        {formStructure.map(section => (
          <fieldset className={styles.formSection} key={section.title}>
            <legend>{section.title}</legend>
            {section.inputs.map(input => {
              return <FormField {...input} key={input.name} />;
            })}
          </fieldset>
        ))}
      </form>
    </FormProvider>
  );
};
