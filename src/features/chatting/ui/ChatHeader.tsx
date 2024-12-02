import styles from './ChatHeader.module.scss';

interface HomeHeaderProps {
  title: string;
}

export const HomeHeader = ({ title }: HomeHeaderProps) => (
  <header className={styles.homeHeader}>
    <h2 className={styles.title}>{title}</h2>
  </header>
);

interface ChatHeaderProps {
  title: string | undefined;
  onBack: () => void;
  onShowDropdown: () => void;
  showDropdown: boolean;
  onLeaveChat: () => void;
}

export const ChatHeader = ({
  title,
  onBack,
  onShowDropdown,
  showDropdown,
  onLeaveChat,
}: ChatHeaderProps) => (
  <header className={styles.header}>
    <button className={styles.backButton} onClick={onBack}>
      <span>←</span>
    </button>
    <h2 className={styles.title}>{title}</h2>
    <div className={styles.menuContainer}>
      <button className={styles.menuButton} onClick={onShowDropdown}>
        <span>⋮</span>
      </button>
      {showDropdown && (
        <div className={styles.dropdown}>
          <button className={styles.dropdownItem} onClick={onLeaveChat}>
            채팅방 나가기
          </button>
        </div>
      )}
    </div>
  </header>
);
