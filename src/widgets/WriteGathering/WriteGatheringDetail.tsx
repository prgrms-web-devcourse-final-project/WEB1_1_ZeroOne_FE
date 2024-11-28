import type { Control } from 'react-hook-form';

import styles from './WriteGatheringDetail.module.scss';

import { GatheringTitleInput, GatheringMarkdownEditor } from '@/features';
import type { GatheringFormData } from '@/features/gathering/model/types';

interface WriteGatheringDetailProps {
  control: Control<GatheringFormData>;
}

export const WriteGatheringDetail = ({ control }: WriteGatheringDetailProps) => {
  return (
    <div className={styles.container}>
      <GatheringTitleInput
        control={control}
        isRequired
        label='제목'
        name='title'
        placeholder='게더링의 제목을 입력해주세요'
      />
      <GatheringMarkdownEditor isRequired label='게더링 설명' />
    </div>
  );
};
