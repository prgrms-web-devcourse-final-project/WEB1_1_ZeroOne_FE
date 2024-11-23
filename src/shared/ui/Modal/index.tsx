import cs from 'classnames';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import styles from './index.module.scss';

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  classNames?: string;
}

export const Modal = ({ isOpen, onClose, children, classNames }: Props) => {
  const rootModalDiv = useRef<HTMLElement | null>(null);

  useEffect(() => {
    rootModalDiv.current = document.getElementById('modal');
  }, []);

  if (!rootModalDiv.current || !isOpen) return null;

  return createPortal(
    <div className={styles.modalBackdrop}>
      <button className={styles.modalBg} onClick={onClose} />
      <div className={cs(styles.modalDialog, classNames)}>{children}</div>
    </div>,
    rootModalDiv.current,
  );
};
