import styles from './ContactModal.module.scss';

import { Modal } from '@/shared/ui';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: number;
  content: string;
  isMe: boolean;
}

export const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  // 샘플 메시지 데이터
  const messages: Message[] = [
    { id: 1, content: '포트폴리오 첨삭 받고 싶어요', isMe: false },
    { id: 2, content: '피드백 드리고 싶어요', isMe: true },
    { id: 3, content: '프로젝트 같이 하고 싶어요', isMe: true },
    { id: 4, content: '카피챗', isMe: true },
  ];

  return (
    <Modal classNames={styles.modalDialogLayout} isOpen={isOpen} onClose={onClose}>
      <div className={styles.container}>
        <div className={styles.profileSection}>
          <div className={styles.profileImage}>
            {/* 임시 이미지로 대체 */}
            <img alt='프로필' src='/api/placeholder/100/100' />
          </div>
          <h2 className={styles.profileName}>홍길동 님에게</h2>
        </div>
        <div className={styles.messageContainer}>
          {messages.map(message => (
            <div
              className={`${styles.messageWrapper} ${
                message.isMe ? styles.myMessage : styles.otherMessage
              }`}
              key={message.id}
            >
              <div className={styles.messageContent}>{message.content}</div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};
