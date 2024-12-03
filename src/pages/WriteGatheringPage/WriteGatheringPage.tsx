import { FormProvider, useForm } from 'react-hook-form';

import styles from './WriteGatheringPage.module.scss';

import type { CreateGatheringRequest } from '@/features';
import { useCreateGathering } from '@/features/gathering/lib/hooks';
import { WriteGatheringOpts, WriteGatheringDetail } from '@/widgets';

export const WriteGatheringPage = () => {
  const methods = useForm<CreateGatheringRequest>({
    defaultValues: {
      sort: '',
      subject: '',
      contact: '',
      personnel: '',
      period: '',
      position: [],
      title: '',
      deadLine: '',
      gatheringTag: [],
      url: '',
      content: '',
      gatheringImages: [],
    },
  });

  const { mutate: createGathering, isPending } = useCreateGathering();

  const onSubmit = (data: CreateGatheringRequest) => {
    createGathering(data);
  };

  return (
    <FormProvider {...methods}>
      <div className={styles.container}>
        <h1 className={styles.h1}>게더링 작성</h1>
        <form className={styles.form} onSubmit={methods.handleSubmit(onSubmit)}>
          <section className={styles.section}>
            <h2 className={styles.h2}>1. 게더링 기본 정보를 등록해주세요.</h2>
            <WriteGatheringOpts control={methods.control} />
          </section>
          <section className={styles.section}>
            <h2 className={styles.h2}>2. 게시글에 대해서 더 자세히 설명해주세요</h2>
            <WriteGatheringDetail control={methods.control} />
          </section>
          <button className={styles.submitButton} disabled={isPending} type='submit'>
            {isPending ? '등록 중...' : '등록하기'}
          </button>
        </form>
      </div>
    </FormProvider>
  );
};
