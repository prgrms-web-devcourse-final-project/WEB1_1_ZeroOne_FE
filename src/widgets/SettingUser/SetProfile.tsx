import styles from './SetProfile.module.scss';

import type { PortfolioFormValues } from '@/features/auth';
import { JOB_CATEGORIES, JOB_SUB_CATEGORY, ProfileForm, profileFormConfig } from '@/features/auth';
import type { PutUserDTO } from '@/features/user/user.dto';
import { useGetUserEdit } from '@/features/user/user.hook';
import { Button } from '@/shared/ui';

interface SetProfileProps {
  userId: number;
}

export const SetProfile = ({ userId }: SetProfileProps) => {
  const { data, isLoading } = useGetUserEdit(userId);
  // console.log('데이터', data);
  const convertDataType = (data: PutUserDTO): PortfolioFormValues => {
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
      imageUrl: rest.imageUrl || '',
      portfolioLink: rest.portfolioLink || '',
      jobTitle: rest.jobTitle || '',
      division: rest.division || '',
      majorJobGroup: majorOption,
      minorJobGroup: minorOption,
      url: socials.map(link => ({ value: link })),
    };
  };

  return (
    <div className={styles.editProfileWrapper}>
      {isLoading ? (
        <></>
      ) : (
        data && (
          <ProfileForm
            data={convertDataType(data.data as PutUserDTO)}
            formConfig={profileFormConfig}
            onSubmit={data => {
              console.log(data);
            }}
          />
        )
      )}
      <Button form='profile-form' type='submit'>
        완료
      </Button>
    </div>
  );
};
