import { faChevronRight, faCommentDots, faEye, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

import styles from './DetailHeader.module.scss';

import type { Archive } from '@/features';
import { ColorMap, useDeleteArchive } from '@/features';
import { Button, Tag } from '@/shared/ui';

export const DetailHeader = ({ archive, archiveId }: { archive: Archive; archiveId: number }) => {
  const { mutate: deleteArchive } = useDeleteArchive();
  const navigate = useNavigate();

  // TODO 수정 버튼 클릭 시, archiveId를 가지고 수정 페이지로 이동해서 정보 다시 fetch 후 수정

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.itemWrapper}>
          <span>Archive</span>
          <FontAwesomeIcon icon={faChevronRight} size='xs' />
          <div
            className={styles.color}
            style={{ backgroundColor: `${ColorMap[archive.type].hex}` }}
          />
          <span>{ColorMap[archive.type].name}</span>
        </div>
      </div>
      <div className={styles.row}>
        <h2>{archive.title}</h2>
        <div className={styles.itemWrapper}>
          <FontAwesomeIcon icon={faCommentDots} size='xs' />
          <span>{archive.commentCount}</span>
          <FontAwesomeIcon icon={faHeart} size='xs' />
          <span>{archive.likeCount}</span>
          <FontAwesomeIcon icon={faEye} size='xs' />
          <span>{archive.hits}</span>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.itemWrapper}>
          <p>{archive.username}</p>
          <span>{archive.job}</span>
        </div>
        <div className={styles.itemWrapper}>
          <Button>수정하기</Button>
          <Button
            onClick={() => {
              deleteArchive(
                { archiveId: Number(archiveId) },
                {
                  onSuccess: () => {
                    navigate(-1);
                  },
                },
              );
            }}
          >
            삭제하기
          </Button>
        </div>
      </div>
      <div className={styles.tags}>
        {archive.tags.map(tag => (
          <Tag isDeleteable={false} key={tag.content} tag={tag} />
        ))}
      </div>
    </div>
  );
};
