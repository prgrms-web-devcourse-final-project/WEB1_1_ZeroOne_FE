import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';

import styles from './MobileSidebarFilter.module.scss';

export const MobileSidebarFilter = ({
  isOpen,
  content,
  onClose,
}: {
  isOpen: boolean;
  content: React.ReactNode;
  onClose: () => void;
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  return (
    <div className={styles.container}>
      <FontAwesomeIcon
        className={styles.closeBtn}
        icon={faX}
        onClick={() => {
          onClose();
        }}
        size='xs'
      />
      {content}
    </div>
  );
};
