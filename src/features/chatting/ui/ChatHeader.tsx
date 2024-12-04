import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './ChatHeader.module.scss';

import { useModalStore } from '@/shared/model/modalStore';

interface HomeHeaderProps {
  title: string;
}

export const HomeHeader = ({ title }: HomeHeaderProps) => {
  const close = useModalStore(state => state.actions.close);

  return (
    <header className={styles.homeHeader}>
      <h2 className={styles.title}>{title}</h2>
      <FontAwesomeIcon
        className={styles.closeBtn}
        icon={faX}
        onClick={() => {
          close();
        }}
        size='xs'
      />
    </header>
  );
};

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
