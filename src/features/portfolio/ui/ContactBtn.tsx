import styles from './ContactBtn.module.scss';

import Logo from '@/shared/assets/paletteLogo.svg?react';
import { useModalStore } from '@/shared/model/modalStore';

interface ContactBtnProps {
  userName: string;
  userId: number; // targetId로 사용할 userId prop 추가
}

export const ContactBtn = ({ userName, userId }: ContactBtnProps) => {
  const open = useModalStore(state => state.actions.open);

  const onOpenModal = () => {
    open('contact', userName, userId); // userId를 targetId로 전달
  };

  return (
    <button className={styles.contactBtn} onClick={onOpenModal}>
      <Logo className={styles.logo} />
    </button>
  );
};
