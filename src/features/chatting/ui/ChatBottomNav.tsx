import styles from './ChatBottomNav.module.scss';

interface ChatBottomNavProps {
  currentView: 'home' | 'chat';
  onChangeView: (view: 'home' | 'chat') => void;
}

export const ChatBottomNav = ({ currentView, onChangeView }: ChatBottomNavProps) => {
  return (
    <nav className={styles.bottomNav}>
      <ul className={styles.navList}>
        <li
          className={`${styles.navItem} ${currentView === 'home' ? styles.active : ''}`}
          onClick={() => {
            onChangeView('home');
          }}
        >
          홈
        </li>
      </ul>
    </nav>
  );
};
