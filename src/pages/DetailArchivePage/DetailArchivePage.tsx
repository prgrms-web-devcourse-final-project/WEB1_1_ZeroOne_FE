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
    worker.start().then(() => {
      if (archiveId) void fetchArchive();
      if (archiveId) void fetchComments();
    });

    return () => {
      worker.stop();
    };
  }, [archiveId]);

  return (
    <div className={styles.wrapper}>
      {archive?.data && (
        <>
          <DetailHeader archive={archive.data} />
          <div className={styles.markdown}>
            <MarkdownPreview markdownText={archive.data.description} />
          </div>
        </>
      )}
      <div className={styles.comment}>
        <WriteComment />
        {comments?.data &&
          comments.data.map(comment => <CommentItem comment={comment} key={comment.commentId} />)}
      </div>
    </div>
  );
};
