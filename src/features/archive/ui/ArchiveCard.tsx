import cn from 'classnames';

import type { ArchiveCardDTO } from '../archive.dto';
import styles from './ArchiveCard.module.scss';

import ColorChipLogo from '@/shared/assets/color-chip-logo.svg';

export const ArchiveCard = ({ archive }: { archive: ArchiveCardDTO }) => {
  return (
    <div className={styles.container}>
      <article className={cn(styles.card, styles[archive.type])}>
        <img
          alt='archive-thumbnail'
          className={archive.thumbnail ? styles.thumbnail : styles.noThumbnail}
          src={archive.thumbnail || ColorChipLogo}
        />
        <div className={styles.contents}>
          <div className={styles.info}>
            <h3>{archive.title}</h3>
            <p>{archive.usename}</p>
          </div>
          <p className={styles.date}>{archive.createDate.toISOString()}</p>
        </div>
      </article>
    </div>
  );
};
