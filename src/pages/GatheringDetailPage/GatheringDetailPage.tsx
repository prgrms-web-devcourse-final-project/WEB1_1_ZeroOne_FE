import { useParams } from 'react-router-dom';

import styles from './GatheringDetailPage.module.scss';

import { MarkdownPreview } from '@/features';
import { GatheringDetailUserInfo } from '@/features/gathering';
import { useGatheringDetail } from '@/features/gathering/lib/hooks';
import { GatheringDetailBtnCon, GatheringDetailHeader, GatheringDetailGrid } from '@/widgets';

export const GatheringDetailPage = () => {
  const { gatheringId } = useParams();
  const { data, isLoading, isError } = useGatheringDetail(gatheringId!);
  console.log('gatheringId:', gatheringId);
  console.log('isLoading:', isLoading);
  console.log('isError:', isError);
  console.log('data:', data);
  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (isError) {
    return <div>게더링 정보를 불러오는데 실패했습니다.</div>;
  }

  if (!data?.data) {
    return <div>게더링을 찾을 수 없습니다.</div>;
  }

  const gatheringDetail = data?.data;
  console.log('gatheringDetail:', gatheringDetail);

  return (
    <div className={styles.container}>
      <GatheringDetailHeader title={gatheringDetail.title} />
      <GatheringDetailGrid
        contact={gatheringDetail.contact}
        createTime={gatheringDetail.createTime}
        deadLine={gatheringDetail.deadLine}
        gatheringTag={gatheringDetail.gatheringTag}
        period={gatheringDetail.period}
        personnel={gatheringDetail.personnel}
        position={gatheringDetail.position}
        sort={gatheringDetail.sort}
        subject={gatheringDetail.subject}
        username={gatheringDetail.username}
      />

      <section className={styles.detailSection}>
        <h3>상세소개</h3>
        <article className={styles.content}>
          <MarkdownPreview markdownText={gatheringDetail.content} />
        </article>
      </section>
      <div className={styles.footer}>
        <div className={styles.stats}>
          <span>
            <i className='eye-icon'></i> 1.1K
          </span>
          <span>
            <i className='heart-icon'></i> 1.1K
          </span>
        </div>
        <GatheringDetailUserInfo
          position={gatheringDetail.position}
          username={gatheringDetail.username}
        />
        <GatheringDetailBtnCon />
      </div>
    </div>
  );
};
