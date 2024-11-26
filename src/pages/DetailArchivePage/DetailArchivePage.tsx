import type { Archive } from '@/features';
import { DetailHeader } from '@/widgets';

const dummyArchive: Archive = {
  title: 'title',
  username: 'username',
  description: 'description',
  job: 'job',
  likeCount: 10,
  canComment: true,
  tags: [{ content: 'tag' }, { content: 'tag' }, { content: 'tag' }, { content: 'tag' }],
  imageUrls: [{ url: 'url' }],
  commentCount: 0,
  hits: 0,
  type: 'red',
};

export const DetailArchivePage = () => {
  return (
    <div className=''>
      <DetailHeader archive={dummyArchive} />
    </div>
  );
};
