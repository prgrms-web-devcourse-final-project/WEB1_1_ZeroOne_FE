import styles from './DetailArchivePage.module.scss';

import { MarkdownPreview, type Archive } from '@/features';
import { DetailHeader } from '@/widgets';

const dummyArchive: Archive = {
  title: 'title',
  username: 'username',
  description:
    '# h1\n## h2\n### 하이하이\n예제 **만드는** 중\n어떻게 _보일지_\n> 인용\n\n```\ncode\n```\n\n',
  job: 'job',
  likeCount: 10,
  canComment: true,
  tags: [{ content: 'tag' }, { content: 'df' }, { content: 'dfsafsda' }, { content: 'fasd' }],
  imageUrls: [{ url: 'url' }],
  commentCount: 0,
  hits: 0,
  type: 'red',
};

export const DetailArchivePage = () => {
  return (
    <div className={styles.wrapper}>
      <DetailHeader archive={dummyArchive} />
      <div className={styles.markdown}>
        <MarkdownPreview markdownText={dummyArchive.description} />
      </div>
    </div>
  );
};
