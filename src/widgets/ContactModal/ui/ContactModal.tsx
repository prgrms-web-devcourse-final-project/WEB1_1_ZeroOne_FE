import styles from './ContactModal.module.scss';

import { useCreateChatRoom } from '@/features/chatting//api/chatting.hook';
import type { ChatCategory } from '@/features/chatting/api/types';
import Logo from '@/shared/assets/paletteLogo.svg?react';
import { Modal } from '@/shared/ui';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  username?: string;
  targetId?: number;
}

interface ChatOption {
  id: number;
  content: string;
  category: ChatCategory;
}

export const ContactModal = ({ isOpen, onClose, username, targetId }: ContactModalProps) => {
  const createChatRoom = useCreateChatRoom();

  const chatOptions: ChatOption[] = [
    { id: 1, content: '포트폴리오 첨삭 받고 싶어요', category: 'MENTORING' },
    { id: 2, content: '피드백 드리고 싶어요', category: 'FEEDBACK' },
    { id: 3, content: '프로젝트 같이 하고 싶어요', category: 'GATHERING' },
    { id: 4, content: '커피챗', category: 'COFFEE_CHAT' },
  ];
  const handleChatOptionClick = (category: ChatCategory) => {
    createChatRoom.mutate(
      { chatCategory: category, targetId : targetId! },
      {
        onSuccess: response => {
          console.log('Success response:', response); // 추가
          onClose();
        },
        onError: error => {
          console.error('Error details:', error); // 추가
        },
      },
    );
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
              disabled={createChatRoom.isPending}
              key={option.id}
              onClick={() => {
                handleChatOptionClick(option.category);
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
