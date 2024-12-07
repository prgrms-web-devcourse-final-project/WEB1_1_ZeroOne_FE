import cn from 'classnames';

import styles from './LikeBtn.module.scss';

import Heart from '@/shared/assets/heart.svg';

interface LikeBtnProps {
  className?: string;
  isLiked?: boolean; // 현재 좋아요 상태
  onLikeClick?: () => void; // 좋아요 클릭 핸들러
  likeCount?: number; // 좋아요 수 (선택적)
  disabled?: boolean; // 버튼 비활성화 상태
}

export const LikeBtn = ({
  className,
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
        className={`${styles.heart} ${isLiked ? styles.liked : ''}`}
        src={Heart}
      />
      {likeCount !== undefined && <span className={styles.count}>{likeCount}</span>}
    </button>
  );
};
