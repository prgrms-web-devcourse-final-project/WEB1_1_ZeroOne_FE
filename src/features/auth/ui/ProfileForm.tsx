import { FormProvider } from 'react-hook-form';

import { FormField } from './FormField';
import styles from './ProfileForm.module.scss';
import { useProfileForm } from '../form.hook';
import { formConfig } from '../form.utils';

export const ProfileForm = () => {
  const { method, formStructure, onSubmit } = useProfileForm({ formConfig });

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
