import { useParams } from 'react-router-dom';

import styles from './DetailArchivePage.module.scss';

import { MarkdownPreview, WriteComment, CommentItem, useArchive, useComments } from '@/features';
import { Loader, TripleDot } from '@/shared/ui';
import { DetailHeader } from '@/widgets';

export const DetailArchivePage = () => {
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
            <MarkdownPreview markdownText={archive.data.description} />
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
};
