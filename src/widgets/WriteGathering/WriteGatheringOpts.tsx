import type { Control } from 'react-hook-form';
import { useWatch } from 'react-hook-form';

import styles from './WriteGatheringOpts.module.scss';

import type { CreateGatheringRequest } from '@/features';
import {
  GatheringSelect,
  gatheringFilterOptions,
  GatheringDatePicker,
  GatheringTagInput,
  GatheringLinkInput,
} from '@/features';
import type { SelectOption } from '@/features/gathering/model/types';

interface WriteGatheringOptsProps {
  control: Control<CreateGatheringRequest>;
}

export const WriteGatheringOpts = ({ control }: WriteGatheringOptsProps) => {
  const sortValue = useWatch({
    control,
    name: 'sort',
  });

  const getSubjectOptions = (): SelectOption[] => {
    if (sortValue === '프로젝트') {
      return gatheringFilterOptions.subject.project;
    }
    if (sortValue === '스터디') {
      return gatheringFilterOptions.subject.study;
    }
    if (sortValue === '동아리') {
      return gatheringFilterOptions.subject.club;
    }
    if (sortValue === '기타') {
      return gatheringFilterOptions.subject.etc;
    }
    return [];
  };

  return (
    <div className={styles.container}>
      <GatheringSelect
        control={control}
        isRequired
        label='모집 구분'
        name='sort'
        options={gatheringFilterOptions.sort}
      />
      <GatheringSelect
        control={control}
        isDisabled={!sortValue}
        isRequired
        label='모집 주제'
        name='subject'
        options={getSubjectOptions()}
        placeholder={!sortValue ? '모임 종류를 먼저 선택해주세요' : '주제를 선택해주세요'}
      />
      <GatheringSelect
        control={control}
        isRequired
        label='진행 방식'
        name='contact'
        options={gatheringFilterOptions.contact}
      />
      <GatheringSelect
        control={control}
        isRequired
        label='진행 기간'
        name='period'
        options={gatheringFilterOptions.period}
      />
      <GatheringSelect
        control={control}
        isRequired
        label='모집 인원'
        name='personnel'
        options={gatheringFilterOptions.personnel}
      />
      <GatheringSelect
        control={control}
        isMulti
        isRequired
        label='모집 분야'
        name='positions'
        options={gatheringFilterOptions.positions}
      />
      <GatheringTagInput
        control={control}
        isRequired
        label='태그'
        name='gatheringTag'
        placeholder='태그를 입력하고 Enter를 눌러주세요'
      />
      <GatheringLinkInput control={control} label='링크' name='url' />
      <GatheringDatePicker control={control} isRequired label='모집 마감일' name='deadLine' />
    </div>
  );
};
