import type React from 'react';

import styles from './ProfileStep.module.scss';

import type { FormValues } from '@/features/auth';
import { ProfileForm, formConfig } from '@/features/auth';
import { postImages } from '@/features/image/image.api';
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
    let profileImageUrl = data.imageUrl.url;

    //이미지 업로드 처리
    if (data.imageUrl.file) {
      try {
        const imageData = new FormData();
        imageData.append('files', data.imageUrl.file);
        const image = await postImages(imageData).then(res => res.data);
        if (image && image.imgUrls[0]) {
          profileImageUrl = image.imgUrls[0].imgUrl;
        }
      } catch {
        console.error('Failed to upload image');
        return;
      }
    }

    const postUserData: PostUserDTO = {
      ...data,
      imageUrl: profileImageUrl,
      majorJobGroup: data.majorJobGroup?.value || '',
      minorJobGroup: data.minorJobGroup?.value || '',
      url: data.url.map(link => link.value),
      s3StoredImageUrls: [],
    };
    createUser(
      {
        data: postUserData,
      },
      {
        onSuccess: () => {
          updateUserData({
            name: data.name,
            imageUrl: data.imageUrl.url,
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
