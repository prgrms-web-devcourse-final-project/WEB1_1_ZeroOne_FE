import type React from 'react';

import styles from './ProfileStep.module.scss';

import type { FormValues } from '@/features/auth';
import { ProfileForm, formConfig, handleImageUpload } from '@/features/auth';
import { useUserStore } from '@/features/user/model/user.store';
import type { PostUserDTO } from '@/features/user/user.dto';
import { useCreateUser } from '@/features/user/user.hook';
import { Button, customConfirm } from '@/shared/ui';

interface ProfileStepProps {
  setStage: React.Dispatch<React.SetStateAction<number>>;
}

export const ProfileStep = ({ setStage }: ProfileStepProps) => {
  const { mutate: createUser } = useCreateUser();

  const { updateUserData } = useUserStore(state => state.actions);
  const userData = useUserStore(state => state.userData);

  const convertDataToFormValue = (): FormValues => {
    const defaultValues = {
      name: '',
      briefIntro: '',
      majorJobGroup: null,
      minorJobGroup: null,
      jobTitle: '',
      division: 'student',
      url: [],
      imageUrl: {
        url: '',
        file: null,
      },
    };

    if (userData) {
      return {
        ...defaultValues,
        name: userData.name || '',
        imageUrl: { url: userData.imageUrl || '', file: null },
      };
    }
    return defaultValues;
  };

  const handleSubmit = async (data: FormValues) => {
    const profileImageUrl = (await handleImageUpload(data.imageUrl)) || data.imageUrl.url;

    const postUserData: PostUserDTO = {
      name: data.name,
      briefIntro: data.briefIntro,
      jobTitle: data.jobTitle,
      division: data.division,
      imageUrl: profileImageUrl,
      majorJobGroup: data.majorJobGroup?.value || '',
      minorJobGroup: data.minorJobGroup?.value || '',
      socials: data.url.map(link => link.value),
      s3StoredImageUrls: [],
    };
    // console.log(postUserData);
    createUser(
      {
        data: postUserData,
      },
      {
        onSuccess: () => {
          updateUserData({
            name: data.name,
            imageUrl: profileImageUrl,
            role: 'JUST_NEWBIE',
          });
          setStage(stage => stage + 1);
        },
        onError: () => {
          void customConfirm({
            title: '오류',
            text: '유저 등록에 실패하셨습니다. 다시 시도해주세요.',
            icon: 'error',
          });
        },
      },
    );
  };

  return (
    <div className={styles.profileContainer}>
      <h3 className={styles.sectionTitle}>유저 프로필 등록</h3>
      {userData && (
        <ProfileForm
          data={convertDataToFormValue()}
          formConfig={formConfig}
          onSubmit={handleSubmit}
        />
      )}
      <div className={styles.btnsWrapper}>
        <Button form='profile-form' type='submit'>
          다음
        </Button>
      </div>
    </div>
  );
};
