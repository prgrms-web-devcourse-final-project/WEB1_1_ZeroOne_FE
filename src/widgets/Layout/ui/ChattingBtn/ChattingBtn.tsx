import styles from './ChattingBtn.module.scss';

import Logo from '@/shared/assets/paletteLogo.svg?react';
import { useModalStore } from '@/shared/model/modalStore';

interface ChattingBtnProps {
  hasNotification?: boolean;
}

export const ChattingBtn = ({ hasNotification = true }: ChattingBtnProps) => {
  const open = useModalStore(state => state.actions.open);
  const onOpenModal = () => {
    console.log('openChattingModal');
    open('chatting');
  };
  return (
    <div className={styles.wrapper}>
      <button aria-label='채팅 모달 열기' className={styles.container} onClick={onOpenModal}>
        <Logo />
      </button>
      {hasNotification && <span className={styles.notification} />}
    </div>
  );
};