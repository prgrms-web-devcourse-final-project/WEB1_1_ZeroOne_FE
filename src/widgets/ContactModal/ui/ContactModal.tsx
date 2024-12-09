import styles from './ContactModal.module.scss';

import Logo from '@/shared/assets/paletteLogo.svg?react';
import { Modal } from '@/shared/ui';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  username?: string;
}

interface ChatOption {
  id: number;
  content: string;
}

export const ContactModal = ({ isOpen, onClose, username }: ContactModalProps) => {
  const chatOptions: ChatOption[] = [
    { id: 1, content: '포트폴리오 첨삭 받고 싶어요' },
    { id: 2, content: '피드백 드리고 싶어요' },
    { id: 3, content: '프로젝트 같이 하고 싶어요' },
    { id: 4, content: '커피챗' },
  ];

  const handleChatOptionClick = (content: string) => {
    // console.log(`Selected option: ${content}`);
    // 채팅 시작 로직 구현
  };

  return (
    <Modal classNames={styles.modalDialogLayout} isOpen={isOpen} onClose={onClose}>
      <div className={styles.container}>
        <div className={styles.profileSection}>
          <div className={styles.logoWrapper}>
            <Logo className={styles.logo} />
          </div>
          <h2 className={styles.profileName}>{username}님에게 연락하기</h2>
        </div>
        <div className={styles.messageContainer}>
          {chatOptions.map(option => (
            <button
              className={styles.messageButton}
              key={option.id}
              onClick={() => {
                handleChatOptionClick(option.content);
              }}
            >
              {option.content}
            </button>
          ))}
        </div>
      </div>
    </Modal>
  );
};
