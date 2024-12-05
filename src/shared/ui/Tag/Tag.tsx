import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Tag.module.scss';

export const Tag = ({
  tag,
  onRemove,
  isDeleteable = true,
}: {
  tag: { tag: string };
  onRemove?: (tagContent: string) => void;
  isDeleteable?: boolean;
}) => (
  <span className={styles.tag} key={tag.tag}>
    {tag.tag}
    {isDeleteable && (
      <FontAwesomeIcon
        icon={faX}
        onClick={() => {
          if (onRemove) onRemove(tag.tag);
        }}
        size='xs'
      />
    )}
  </span>
);
