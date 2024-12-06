import styles from './SetProfile.module.scss';

import type { PortfolioFormValues } from '@/features/auth';
import {
  handleImageUpload,
  JOB_CATEGORIES,
  JOB_SUB_CATEGORY,
  ProfileForm,
  profileFormConfig,
} from '@/features/auth';
import type { UserDataState } from '@/features/user/model/user.store';
import { useUserStore } from '@/features/user/model/user.store';
import type { EditUserDTO, PutUserDTO } from '@/features/user/user.dto';
import { useEditUser, useGetUserEdit } from '@/features/user/user.hook';
import { Button, customConfirm } from '@/shared/ui';

interface SetProfileProps {
  userData: UserDataState;
}

export const SetProfile = ({ userData }: SetProfileProps) => {
  const { updateUserData } = useUserStore(state => state.actions);
  const { data, isLoading } = useGetUserEdit(userData.userId);
  const { mutate: editUser } = useEditUser(userData.userId);

  const convertDataType = (data: EditUserDTO): PortfolioFormValues => {
    const { socials, majorJobGroup, minorJobGroup, ...rest } = data;

    const majorOption = {
      value: majorJobGroup,
      label:
        JOB_CATEGORIES.find(majorCatergory => majorCatergory.value === majorJobGroup)?.label ??
        '알 수 없음',
    };

    const minorOption = {
      value: minorJobGroup,
      label:
        JOB_SUB_CATEGORY.find(minorCategory => minorCategory.value === minorJobGroup)?.label ??
        '알 수 없음',
    };
    return {
      name: rest.name || '',
      email: rest.email || '',
      briefIntro: rest.briefIntro || '',
      imageUrl: {
        url: rest.imageUrl || '',
        file: null,
      },
      portfolioLink: rest.portfolioLink || '',
      jobTitle: rest.jobTitle || '',
      division: rest.division || '',
      majorJobGroup: majorOption,
      minorJobGroup: minorOption,
      url: socials.map(link => ({ value: link })),
    };
  };

  const handleSubmit = async (data: PortfolioFormValues) => {
    const profileImageUrl = (await handleImageUpload(data.imageUrl)) || data.imageUrl.url;

    const putUserData: PutUserDTO = {
      name: data.name,
      briefIntro: data.briefIntro,
      portfolioLink: data.portfolioLink,
      jobTitle: data.jobTitle,
      division: data.division,
      imageUrl: profileImageUrl,
      majorJobGroup: data.majorJobGroup?.value || '',
      minorJobGroup: data.minorJobGroup?.value || '',
      socials: data.url.map(link => link.value),
      s3StoredImageUrls: [],
    };

    console.log(putUserData);

    editUser(
      {
        data: putUserData,
      },
      {
        onSuccess: () => {
          if (userData.role === 'JUST_NEWBIE' && data.portfolioLink) {
            updateUserData({
              name: data.name,
              imageUrl: profileImageUrl,
              role: 'OLD_NEWBIE',
            });
          }

          void customConfirm({
            title: '성공',
            text: '유저 프로필를 수정하였습니다.',
            icon: 'success',
            showCancelButton: false,
          });
        },
        onError: () => {
          void customConfirm({
            title: '오류',
            text: '유저 프로필 수정에 실패하였습니다. 다시 시도해주세요. ',
            icon: 'error',
            showCancelButton: false,
          });
        },
      },
    );
  };

  return (
    <div className={styles.editProfileWrapper}>
      {isLoading ? (
        <></>
      ) : (
        data && (
          <ProfileForm
            data={convertDataType(data.data as EditUserDTO)}
            formConfig={profileFormConfig}
            onSubmit={handleSubmit}
          />
        )
      )}
      <Button form='profile-form' type='submit'>
        완료
      </Button>
    </div>
  );
};
