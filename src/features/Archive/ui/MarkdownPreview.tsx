import { marked } from 'marked';

import 'highlight.js/styles/github.css';
import styles from './MarkdownPreview.module.scss';

type MarkdownPreviewProps = {
  markdownText: string;
};

export const MarkdownPreview = ({ markdownText }: MarkdownPreviewProps) => {
  return (
    <div
      className={styles.mirror}
      dangerouslySetInnerHTML={{
        __html: marked(markdownText),
      }}
    />
  );
};
