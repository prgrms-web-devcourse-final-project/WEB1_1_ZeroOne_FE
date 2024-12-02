import styles from './ContactBtn.module.scss';

import Logo from '@/shared/assets/paletteLogo.svg?react';
import { useModalStore } from '@/shared/model/modalStore';

interface ContactBtnProps {
  userName: string;
}

export const ContactBtn = ({ userName }: ContactBtnProps) => {
  const open = useModalStore(state => state.actions.open);
  
  const onOpenModal = () => {
    console.log('openContModal');
    open('contact', userName);  // userName을 두 번째 인자로 전달
  };

  return (
    <button aria-label='연락하기' className={styles.contactBtn} onClick={onOpenModal}>
      <Logo className={styles.logo} />
    </button>
  );
};