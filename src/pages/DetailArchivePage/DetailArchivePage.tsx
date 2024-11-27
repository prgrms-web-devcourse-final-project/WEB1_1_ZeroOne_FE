import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import styles from './DetailArchivePage.module.scss';
import { worker } from '../../mocks/browser';

import { MarkdownPreview, WriteComment, CommentItem, useArchive, useComment } from '@/features';
import { DetailHeader } from '@/widgets';

export const DetailArchivePage = () => {
  const { archiveId } = useParams();

  const { data: archive, refetch: fetchArchive } = useArchive(Number(archiveId));
  const { data: comments, refetch: fetchComments } = useComment(Number(archiveId), !!archive);

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
    if (archive) void fetchComments();
  }, [archive, fetchComments]);

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
        {comments?.data &&
          comments.data.map(comment => (
            <CommentItem archiveId={Number(archiveId)} comment={comment} key={comment.commentId} />
          ))}
      </div>
    </div>
  );
};
