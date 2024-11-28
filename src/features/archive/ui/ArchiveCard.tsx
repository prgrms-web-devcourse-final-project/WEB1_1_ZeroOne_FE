import cn from 'classnames';

import type { ArchiveCardDTO } from '../archive.dto';
import styles from './ArchiveCard.module.scss';

import ColorChipLogo from '@/shared/assets/color-chip-logo.svg';
import EmptyHeart from '@/shared/assets/empty-heart.svg';
import Heart from '@/shared/assets/heart.svg';

export const ArchiveCard = ({ archive }: { archive: ArchiveCardDTO }) => {
  return (
    <div className={styles.container}>
      <article className={styles.card}>
        <img
          alt='archive-thumbnail'
          className={archive.thumbnail ? styles.thumbnail : styles.noThumbnail}
          src={archive.thumbnail || ColorChipLogo}
        />
        {<div className={cn(styles.color, styles[archive.type])} />}
        <div className={styles.contents}>
          <div className={styles.info}>
            <h3>{archive.title}</h3>
            <p>{archive.username}</p>
            <span>{archive.introduction}</span>
          </div>
          <p className={styles.date}>{archive.createDate.toISOString().slice(0, 10)}</p>
          <img
            alt='isLiked-icon'
            className={styles.heart}
            src={archive.isLiked ? Heart : EmptyHeart}
          />
        </div>
      </article>
    </div>
  );
};
