import { useParams } from 'react-router-dom';

import styles from './GatheringDetailPage.module.scss';

import { MarkdownPreview } from '@/features';
import { GatheringDetailUserInfo } from '@/features/gathering';
import { useGatheringDetail } from '@/features/gathering/api/gathering.hook';
import { GatheringDetailBtnCon, GatheringDetailHeader, GatheringDetailGrid } from '@/widgets';
export const GatheringDetailPage = () => {
  const { gatheringId } = useParams();
  const { gathering: data, isLoading, isError } = useGatheringDetail(gatheringId!);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading gathering detail</div>;
  if (!data) return <div>No gathering found</div>;
  // 더미 데이터s
  // const data = {
  //   sort: '프로젝트',
  //   username: '홍길동',
  //   createTime: '2024-11-24',
  //   subject: '개발',
  //   contact: '온라인',
  //   personnel: 3,
  //   period: '3개월',
  //   deadLine: '2024-11-24',
  //   position: '개발자',
  //   gatheringTag: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'React Query'],
  //   contactUrl: 'https://open.kakao.com/test',
  //   title: 'React 기반 웹 프로젝트 팀원 모집',
  //   content:
  //     '안녕하세요! React와 TypeScript를 사용하여 웹 프로젝트를 진행할 팀원을 모집합니다.\n\n현재 기획과 디자인이 완료된 상태이며, 프론트엔드 개발자 2명을 추가로 모집하고 있습니다.\n\n주 2회 온라인 미팅을 진행하며, 소통은 Discord를 통해 진행됩니다.\n\n많은 관심 부탁드립니다!',
  // };

  return (
    <div className={styles.container}>
      <GatheringDetailHeader title='제목 ㅋㅋ ' />
      <GatheringDetailGrid />

      <section className={styles.detailSection}>
        <h3>상세소개</h3>
        <article className={styles.content}>
          <MarkdownPreview markdownText={data.content} />
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
        <GatheringDetailUserInfo position={data.position} username={data.username} />
        <GatheringDetailBtnCon />
      </div>
    </div>
  );
};
