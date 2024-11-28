import { FormProvider } from 'react-hook-form';

import { FormField } from './FormField';
import styles from './ProfileForm.module.scss';
import { useProfileForm } from '../form.hook';
import { formConfig } from '../form.utils';

interface ProfileFormProps {
  submitAction?: () => void;
}

export const ProfileForm = ({ submitAction }: ProfileFormProps) => {
  const { method, formStructure, onSubmit } = useProfileForm({ formConfig, submitAction });

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
