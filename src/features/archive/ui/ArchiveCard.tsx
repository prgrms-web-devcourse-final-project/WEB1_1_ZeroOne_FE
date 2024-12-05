import cn from 'classnames';
import { useNavigate } from 'react-router-dom';

import type { ArchiveCardDTO } from '../archive.dto';
import styles from './ArchiveCard.module.scss';

import { useLikeArchive } from '@/features';
import ColorChipLogo from '@/shared/assets/color-chip-logo.svg';
import EmptyHeart from '@/shared/assets/empty-heart.svg';
import Heart from '@/shared/assets/heart.svg';

export const ArchiveCard = ({ archive, isMine }: { archive: ArchiveCardDTO; isMine?: boolean }) => {
  const { mutate: likeArchive } = useLikeArchive(archive.archiveId);
  const navigate = useNavigate();

  return (
    <div>
      <article className={styles.card}>
        <img
          alt='archive-thumbnail'
          className={archive.imageUrl ? styles.thumbnail : styles.noThumbnail}
          src={archive.imageUrl || ColorChipLogo}
        />
        {<div className={cn(styles.color, styles[archive.type])} />}
        <div
          className={styles.contents}
          onClick={() => {
            navigate(`/archive/${archive.archiveId}`);
          }}
        >
          <div className={styles.info}>
            <h3>{archive.title}</h3>
            <p>{archive.username}</p>
            <span>{archive.introduction}</span>
          </div>
          <p className={styles.date}>{archive.createDate}</p>
        </div>
        {!isMine && (
          <button
            onClick={() => {
              likeArchive();
            }}
          >
            <img
              alt='isLiked-icon'
              className={styles.heart}
              src={archive.isLiked ? Heart : EmptyHeart}
            />
          </button>
        )}
      </article>
    </div>
  );
};
