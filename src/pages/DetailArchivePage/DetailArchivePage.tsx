import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import styles from './DetailArchivePage.module.scss';

import { MarkdownPreview, WriteComment, CommentItem, useArchive, useComments } from '@/features';
import { TripleDot } from '@/shared/ui';
import { DetailHeader } from '@/widgets';

export const DetailArchivePage = () => {
  const { archiveId } = useParams();

  const { data: archive, refetch: fetchArchive } = useArchive(Number(archiveId));
  const { items, isFetchingNextPage, ref, fetchNextPage } = useComments(Number(archiveId));

  useEffect(() => {
    if (archiveId) {
      fetchArchive().catch(console.error);
      fetchNextPage().catch(console.error);
    }
  }, [archiveId]);

  return (
    <div className={styles.wrapper}>
      {archive && archive.data && (
        <>
          <DetailHeader archive={archive.data} archiveId={Number(archiveId)} />
          <div className={styles.markdown}>
            <MarkdownPreview markdownText={archive.data.description} />
          </div>
        </>
      )}
      <div className={styles.comment}>
        <WriteComment archiveId={Number(archiveId)} />
        {items &&
          items.map(comment => (
            <CommentItem archiveId={Number(archiveId)} comment={comment} key={comment.commentId} />
          ))}
        {archive && <div ref={ref}>{isFetchingNextPage && <TripleDot />}</div>}
      </div>
    </div>
  );
};
