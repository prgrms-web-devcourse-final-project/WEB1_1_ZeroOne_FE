import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './MobileSidebarFilter.module.scss';

export const MobileSidebarFilter = ({
  content,
  onClose,
}: {
  content: React.ReactNode;
  onClose: () => void;
}) => {
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
