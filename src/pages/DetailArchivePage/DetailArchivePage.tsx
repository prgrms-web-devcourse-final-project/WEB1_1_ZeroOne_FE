import { lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';

import styles from './DetailArchivePage.module.scss';

import { WriteComment, CommentItem, useArchive, useComments } from '@/features';
import { Loader, TripleDot } from '@/shared/ui';
import { DetailHeader } from '@/widgets';

// 마크다운 프리뷰 컴포넌트를 직접 경로에서 지연 로딩
const MarkdownPreview = lazy(() => import('@/features/archive/ui/MarkdownPreview'));

// 마크다운 로딩 Fallback 컴포넌트
const MarkdownLoadingFallback = () => (
  <div className={styles.markdownLoading}>
    <div className={styles.shimmer}></div>
    <div className={styles.shimmer} style={{ width: '80%' }}></div>
    <div className={styles.shimmer} style={{ width: '90%' }}></div>
    <div className={styles.shimmer} style={{ width: '70%' }}></div>
  </div>
);

export default function DetailArchivePage() {
  const { archiveId } = useParams();

  const { data: archive, isLoading: isArchiveLoading } = useArchive(Number(archiveId));
  const {
    items,
    isFetchingNextPage,
    ref,
    isLoading: isCommentsLoading,
  } = useComments(Number(archiveId));

  if (isArchiveLoading || isCommentsLoading) return <Loader />;

  return (
    <div className={styles.wrapper}>
      {archive && archive.data && (
        <>
          <DetailHeader archive={archive.data} archiveId={Number(archiveId)} />
          <div className={styles.markdown}>
            <Suspense fallback={<MarkdownLoadingFallback />}>
              <MarkdownPreview markdownText={archive.data.description} />
            </Suspense>
          </div>
        </>
      )}
      {archive?.data?.canComment && (
        <div className={styles.comment}>
          <WriteComment archiveId={Number(archiveId)} />
          {items &&
            items.map(comment => (
              <CommentItem
                archiveId={Number(archiveId)}
                comment={comment}
                key={comment.commentId}
              />
            ))}
          {archive && <div ref={ref}>{isFetchingNextPage && <TripleDot />}</div>}
        </div>
      )}
    </div>
  );
}
