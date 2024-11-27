import { faChevronRight, faCommentDots, faEye, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './DetailHeader.module.scss';

import type { Archive } from '@/features';
import { ColorMap } from '@/features';
import { Button, Tag } from '@/shared/ui';

export const DetailHeader = ({ archive }: { archive: Archive }) => {
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
          <Button>삭제하기</Button>
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
