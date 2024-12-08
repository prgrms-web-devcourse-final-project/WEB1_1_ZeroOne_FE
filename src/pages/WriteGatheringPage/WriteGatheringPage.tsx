import cn from 'classnames';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import styles from './WriteGatheringPage.module.scss';

import type { CreateGatheringRequest } from '@/features';
import {
  useCreateGathering,
  useGatheringDetail,
  useUpdateGathering,
} from '@/features/gathering/lib/hooks';
import { Button } from '@/shared/ui';
import { WriteGatheringOpts, WriteGatheringDetail } from '@/widgets';

export const WriteGatheringPage = () => {
  const { gatheringId } = useParams(); // URL에서 gatheringId 가져오기
  const isEdit = !!gatheringId;

  // 수정 시 기존 데이터 조회
  const { data: detailData, isLoading } = useGatheringDetail(gatheringId!);

  const methods = useForm<CreateGatheringRequest>({
    defaultValues: {
      sort: '',
      subject: '',
      contact: '',
      personnel: 1,
      period: '',
      positions: [],
      title: '',
      deadLine: '',
      gatheringTag: [],
      url: '',
      content: '',
      gatheringImages: [],
    },
  });

  // 생성/수정 mutation 분기
  const { mutate: createGathering, isPending: isCreating } = useCreateGathering();
  const { mutate: updateGathering, isPending: isUpdating } = useUpdateGathering();

  // 기존 데이터 폼에 세팅
  useEffect(() => {
    if (isEdit && detailData?.data) {
      const { data } = detailData;
      methods.reset({
        sort: data.sort,
        subject: data.subject,
        contact: data.contact,
        personnel: data.personnel,
        period: data.period,
        positions: data.positions,
        title: data.title,
        deadLine: data.deadLine,
        gatheringTag: data.gatheringTag,
        url: data.contactUrl,
        content: data.content,
        gatheringImages: [],
      });
    }
  }, [isEdit, detailData, methods]);

  const onSubmit = (data: CreateGatheringRequest) => {
    if (isEdit) {
      updateGathering({ gatheringId: gatheringId, data });
    } else {
      createGathering(data);
    }
  };

  if (isEdit && isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <FormProvider {...methods}>
      <div className={styles.container}>
        <h1 className={styles.h1}>{isEdit ? '게더링 수정' : '게더링 작성'}</h1>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <section className={styles.section}>
            <h2 className={styles.h2}>1. 게더링 기본 정보를 등록해주세요.</h2>
            <WriteGatheringOpts control={methods.control} />
          </section>
          <section className={styles.section}>
            <h2 className={styles.h2}>2. 게시글에 대해서 더 자세히 설명해주세요</h2>
            <WriteGatheringDetail control={methods.control} />
          </section>
          <section className={cn(styles.section, styles.btnCon)}>
            <Button
              className={styles.submitButton}
              disabled={isCreating || isUpdating}
              type='submit'
            >
              {isCreating || isUpdating ? '처리 중...' : isEdit ? '수정하기' : '등록하기'}
            </Button>
          </section>
        </form>
      </div>
    </FormProvider>
  );
};
