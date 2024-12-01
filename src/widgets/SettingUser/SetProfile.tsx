import { ProfileForm, profileFormConfig } from '@/features/auth';

export const SetProfile = () => {
  return (
    <ProfileForm
      formConfig={profileFormConfig}
      onSubmit={data => {
        console.log(data);
      }}
    />
  );
};
