import { faCommentDots, faImage, faLink, faCode } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Toolbar.module.scss';

type ToolbarProps = {
  onCommand: (symbol: string, wrap?: boolean) => void;
  onInsertImage: (file: File) => void;
};

export const Toolbar = ({ onCommand, onInsertImage }: ToolbarProps) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onInsertImage(event.target.files[0]);
    }
  };

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
      <label className={styles.imageLabel}>
        <FontAwesomeIcon icon={faImage} />
        <input
          accept='image/png,image/jpg,image/jpeg,image/gif'
          className={styles.imageInput}
          onChange={handleFileChange}
          type='file'
        />
      </label>
    </div>
  );
};
