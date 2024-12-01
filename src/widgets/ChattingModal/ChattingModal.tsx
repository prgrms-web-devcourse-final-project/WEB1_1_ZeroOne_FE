import styles from './ChattingModal.module.scss';

import { Modal } from '@/shared/ui';

interface ChattingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChattingModal = ({ isOpen, onClose }: ChattingModalProps) => {
  return (
    <Modal classNames={styles.modalDialogLayout} isOpen={isOpen} onClose={onClose}>
      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <h2 className={styles.title}>장금숙</h2>
        </header>

        {/* Chat Content Area */}
        <article className={styles.chatContent}>{/* 채팅 메시지들이 들어갈 영역 */}</article>

        {/* Bottom Navigation */}
        <nav className={styles.bottomNav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>홈</li>
            <li className={styles.navItem}>알림</li>
            <li className={styles.navItem}>설정</li>
          </ul>
        </nav>
      </div>
    </Modal>
  );
};
