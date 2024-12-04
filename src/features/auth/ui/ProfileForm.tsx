import { useEffect } from 'react';
import { FormProvider } from 'react-hook-form';

import { FormField } from './FormField';
import styles from './ProfileForm.module.scss';
import { useProfileForm } from '../form.hook';
import type { FormConfigType, FormValues } from '../form.types';

interface ProfileFormProps<T extends FormValues> {
  formConfig: FormConfigType<T>;
  onSubmit: (data: T) => void;
  data: Partial<T>;
}

export const ProfileForm = <T extends FormValues>({
  onSubmit,
  formConfig,
  data,
}: ProfileFormProps<T>) => {
  const { method, formStructure } = useProfileForm({ formConfig });

  useEffect(() => {
    method.reset(data);
  }, []);

  return (
    <FormProvider {...method}>
      <form
        className={styles.profileForm}
        id='profile-form'
        onSubmit={method.handleSubmit(onSubmit)}
      >
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
