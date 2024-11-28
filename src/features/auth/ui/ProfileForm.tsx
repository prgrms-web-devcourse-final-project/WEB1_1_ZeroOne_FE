import { FormProvider } from 'react-hook-form';

import { FormField } from './FormField';
import styles from './ProfileForm.module.scss';
import { useProfileForm } from '../form.hook';
import type { FormConfigType, FormValues } from '../form.types';

interface ProfileFormProps {
  formConfig: FormConfigType<FormValues>;
  onSubmit: (data: FormValues) => void;
}

export const ProfileForm = ({ onSubmit, formConfig }: ProfileFormProps) => {
  const { method, formStructure } = useProfileForm({ formConfig });

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
