import {
  faChevronRight,
  faCommentDots,
  faEye,
  faFeather,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

import styles from './DetailHeader.module.scss';

import type { Archive } from '@/features';
import { ColorMap, useArchiveStore, useDeleteArchive } from '@/features';
import { Button, customToast, Tag } from '@/shared/ui';
import { findCategoryName } from '@/shared/util';

export const DetailHeader = ({ archive, archiveId }: { archive: Archive; archiveId: number }) => {
  const { mutate: deleteArchive } = useDeleteArchive();
  const navigate = useNavigate();

  const { setArchiveData, setArchiveId, setColor } = useArchiveStore();

  const handleEditArchive = () => {
    setArchiveData({
      title: archive.title,
      description: archive.description,
      introduction: archive.introduction,
      colorType: archive.type,
      canComment: archive.canComment,
      tags: archive.tags,
      imageUrls: archive.imageUrls,
    });
    setArchiveId(archiveId);
    setColor(archive.type);
    navigate(`/archive/write?edit=true`);
  };

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
          <img alt='user profile' className={styles.profile} src={archive.userProfile} />
          <p>{archive.username}</p>
          <span>{findCategoryName(archive.job)}</span>
        </div>
        <div className={styles.itemWrapper}>
          {archive.isMine && (
            <>
              <Button onClick={handleEditArchive}>수정하기</Button>
              <Button
                onClick={() => {
                  deleteArchive(
                    { archiveId: Number(archiveId) },
                    {
                      onSuccess: () => {
                        navigate(-1);
                        void customToast({
                          text: '아카이브가 삭제되었습니다',
                          timer: 3000,
                          icon: 'success',
                        });
                      },
                    },
                  );
                }}
              >
                삭제하기
              </Button>
            </>
          )}
        </div>
      </div>
      <div className={styles.tags}>
        {archive.tags.map(tag => (
          <Tag isDeleteable={false} key={tag.tag} tag={tag} />
        ))}
      </div>
      <div className={styles.intro}>
        <FontAwesomeIcon icon={faFeather} />
        {archive.introduction}
      </div>
    </div>
  );
};
