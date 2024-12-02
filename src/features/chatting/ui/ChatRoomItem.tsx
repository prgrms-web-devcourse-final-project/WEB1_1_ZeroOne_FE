import styles from './ChatRoomItem.module.scss';

interface ChatRoomItemProps {
  chatRoomId: number;
  partnerProfileImg: string;
  partnerName: string;
  recentlyChat: string;
  recentTime: string;
  onClick: () => void;
}

export const ChatRoomItem = ({
  partnerProfileImg,
  partnerName,
  recentlyChat,
  recentTime,
  onClick,
}: ChatRoomItemProps) => {
  return (
    <div className={styles.chatRoom} onClick={onClick}>
      <div className={styles.avatar}>
        <img alt='' src={partnerProfileImg} />
      </div>
      <div className={styles.chatInfo}>
        <div className={styles.chatHeader}>
          <span className={styles.name}>{partnerName}</span>
          <span className={styles.time}>{recentTime}</span>
        </div>
        <p className={styles.lastMessage}>{recentlyChat}</p>
      </div>
    </div>
  );
};
