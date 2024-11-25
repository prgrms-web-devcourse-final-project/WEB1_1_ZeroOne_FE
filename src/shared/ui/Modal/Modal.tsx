import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import styles from './Modal.module.scss';

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  classNames?: string;
}

export const Modal = ({ isOpen, onClose, children, classNames }: Props) => {
  const rootModalDiv = useRef<HTMLElement | null>(null);
  const [mount, setMount] = useState<boolean>(false);

  useEffect(() => {
    rootModalDiv.current = document.getElementById('modal');
    setMount(true);
  }, []);

  if (!rootModalDiv.current || !mount || !isOpen) return null;

  return createPortal(
    <div className={styles.modalBackdrop}>
      <button className={styles.modalBg} onClick={onClose} />
      <dialog className={cn(styles.modalDialog, classNames)}>{children}</dialog>
    </div>,
    rootModalDiv.current,
  );
};
