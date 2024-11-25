import { faCommentDots, faImage, faLink, faCode } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Toolbar.module.scss';

type ToolbarProps = {
  onCommand: (symbol: string, wrap?: boolean) => void;
  onInsertImage: () => void;
};

export const Toolbar = ({ onCommand, onInsertImage }: ToolbarProps) => {
  return (
    <div className={styles.toolbar}>
      <button
        onClick={() => {
          onCommand('# ');
        }}
      >
        H1
      </button>
      <button
        onClick={() => {
          onCommand('## ');
        }}
      >
        H2
      </button>
      <button
        onClick={() => {
          onCommand('### ');
        }}
      >
        H3
      </button>
      <button
        className={styles.bold}
        onClick={() => {
          onCommand('**', true);
        }}
      >
        B
      </button>
      <button
        className={styles.italic}
        onClick={() => {
          onCommand('_', true);
        }}
      >
        I
      </button>
      <button
        onClick={() => {
          onCommand('> ');
        }}
      >
        <FontAwesomeIcon icon={faCommentDots} />
      </button>
      <button
        onClick={() => {
          onCommand('```');
        }}
      >
        <FontAwesomeIcon icon={faCode} />
      </button>
      <button
        onClick={() => {
          onCommand('[Link](url)');
        }}
      >
        <FontAwesomeIcon icon={faLink} />
      </button>
      <button onClick={onInsertImage}>
        <FontAwesomeIcon icon={faImage} />
      </button>
    </div>
  );
};
