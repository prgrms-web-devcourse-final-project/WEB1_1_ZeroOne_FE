import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import styles from './DetailArchivePage.module.scss';
import { worker } from '../../mocks/browser';

import { MarkdownPreview, WriteComment, CommentItem, useArchive, useComments } from '@/features';
import { DetailHeader } from '@/widgets';

export const DetailArchivePage = () => {
  const { archiveId } = useParams();

  const { data: archive, refetch: fetchArchive } = useArchive(Number(archiveId));
  const { items, isFetchingNextPage, ref, fetchNextPage } = useComments(Number(archiveId));

  useEffect(() => {
    worker
      .start()
      .then(() => {
        if (archiveId) void fetchArchive();
      })
      .catch(error => {
        console.error('Failed to start worker:', error);
      });

    return () => {
      worker.stop();
    };
  }, [archiveId, fetchArchive]);

  useEffect(() => {
    if (archive) void fetchNextPage();
  }, [archive, fetchNextPage]);

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
        <WriteComment />
        {items &&
          items.map(comment => (
            <CommentItem archiveId={Number(archiveId)} comment={comment} key={comment.commentId} />
          ))}
        <div ref={ref}>{isFetchingNextPage && <p>Loading more comments...</p>}</div>
      </div>
    </div>
  );
};
