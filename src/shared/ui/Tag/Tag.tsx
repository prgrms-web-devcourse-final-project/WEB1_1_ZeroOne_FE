import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Tag.module.scss';

export const Tag = ({
  tag,
  onRemove,
  isDeleteable = true,
}: {
  tag: { content: string };
  onRemove?: (tagContent: string) => void;
  isDeleteable?: boolean;
}) => (
  <span className={styles.tag} key={tag.content}>
    {tag.content}
    {isDeleteable && (
      <FontAwesomeIcon
        icon={faX}
        onClick={() => {
          if (onRemove) onRemove(tag.content);
        }}
        size='xs'
      />
    )}
  </span>
);
