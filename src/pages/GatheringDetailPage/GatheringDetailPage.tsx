import { useParams } from 'react-router-dom';

import styles from './GatheringDetailPage.module.scss';

import { MarkdownPreview } from '@/features';
import { GatheringDetailUserInfo } from '@/features/gathering';
import { useGatheringDetail, useGatheringLike } from '@/features/gathering/lib/hooks';
import { Loader, TripleDot } from '@/shared/ui';
import { LikeBtn } from '@/shared/ui/LikeBtn/LikeBtn';
import { GatheringDetailBtnCon, GatheringDetailHeader, GatheringDetailGrid } from '@/widgets';

export const GatheringDetailPage = () => {
  const { gatheringId } = useParams();
  const { data, isLoading, isError } = useGatheringDetail(gatheringId!);

  const { mutate: toggleLike, isPending } = useGatheringLike({
    gatheringId: gatheringId!,
    onSuccess: response => {
      console.log('좋아요 성공:', response);
    },
    onError: error => {
      console.error('좋아요 실패:', error);
    },
  });
  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div>
        <TripleDot />
        게더링 정보를 불러오는데 실패했습니다.
      </div>
    );
  }

  if (!data?.data) {
    return (
      <div>
        <TripleDot />
        게더링을 찾을 수 없습니다.
      </div>
    );
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
        positions={gatheringDetail.positions}
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
          <LikeBtn
            disabled={isPending}
            likeCount={gatheringDetail.likeCounts}
            onLikeClick={toggleLike}
          />
          <span className={styles.likeCount}>{gatheringDetail.likeCounts}</span>
        </div>
        <GatheringDetailUserInfo username={gatheringDetail.username} />
        <GatheringDetailBtnCon gatheringId={gatheringId} userId={gatheringDetail.userId} />
      </div>
    </div>
  );
};
