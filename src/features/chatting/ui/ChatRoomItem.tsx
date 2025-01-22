import styles from './ChatRoomItem.module.scss';

interface ChatRoomItemProps {
  chatRoomId?: number;
  userId?: number;
  username: string;
  profileImg: string;
  onClick: () => void;
}

export const ChatRoomItem = ({ username, profileImg, onClick }: ChatRoomItemProps) => {
  return (
    <div className={styles.chatRoom} onClick={onClick}>
      <div className={styles.avatar}>
        <img alt='' src={profileImg} />
      </div>
      <div className={styles.chatInfo}>
        <div className={styles.chatHeader}>
          <span className={styles.name}>{username}</span>
        </div>
      </div>
    </div>
  );
};
