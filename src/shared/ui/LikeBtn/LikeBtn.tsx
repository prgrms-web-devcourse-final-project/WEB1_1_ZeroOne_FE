import cn from 'classnames';

import styles from './LikeBtn.module.scss';

import EmptyHeart from '@/shared/assets/empty-heart.svg';
import Heart from '@/shared/assets/heart.svg';

interface LikeBtnProps {
  className?: string;
  heartClassName?: string;
  isLiked?: boolean;
  onLikeClick?: () => void;
  likeCount?: number;
  disabled?: boolean;
}

export const LikeBtn = ({
  className,
  heartClassName,
  isLiked = false,
  onLikeClick,
  likeCount,
  disabled = false,
}: LikeBtnProps) => {
  return (
    <button
      className={cn(styles.likeButton, className)}
      disabled={disabled}
      onClick={e => {
        e.stopPropagation();
        onLikeClick?.();
      }}
    >
      <img
        alt={isLiked ? '좋아요 취소' : '좋아요'}
        className={cn(styles.heart, heartClassName)}
        src={isLiked ? Heart : EmptyHeart}
      />
      {likeCount !== undefined && <span className={styles.count}>{likeCount}</span>}
    </button>
  );
};
