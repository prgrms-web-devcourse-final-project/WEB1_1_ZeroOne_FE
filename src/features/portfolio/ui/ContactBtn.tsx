import styles from './ContactBtn.module.scss';

import Logo from '@/shared/assets/paletteLogo.svg?react';
import { useModalStore } from '@/shared/model/modalStore';
// interface ContactBtnProps {
//   onClick?: () => void;
// }

export const ContactBtn = () => {
  const open = useModalStore(state => state.actions.open);
  const onOpenModal = () => {
    console.log('openContModal');
    open('contact');
  };
  return (
    <button aria-label='연락하기' className={styles.contactBtn} onClick={onOpenModal}>
      <Logo className={styles.logo} />
    </button>
  );
};
