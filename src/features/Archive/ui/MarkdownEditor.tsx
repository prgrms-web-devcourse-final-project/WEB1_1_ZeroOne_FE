import { markdown } from '@codemirror/lang-markdown';
import { EditorView } from '@codemirror/view';
import { faCommentDots, faImage, faLink, faCode } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CodeMirror from '@uiw/react-codemirror';
import hljs from 'highlight.js';
import { marked } from 'marked';
import { useState, useCallback } from 'react';
import 'highlight.js/styles/github.css';

import styles from './MarkdownEditor.module.scss';

const renderer = new marked.Renderer();

renderer.code = ({ text, lang }) => {
  if (lang && hljs.getLanguage(lang)) {
    try {
      return hljs.highlight(text, { language: lang }).value;
    } catch (error) {
      if (error instanceof Error) console.error(error);
    }
  }
  return hljs.highlightAuto(text).value;
};

marked.setOptions({
  renderer,
  breaks: true,
});

export const MarkdownEditor = () => {
  const [markdownText, setMarkdownText] = useState<string>('');

  const handleEditorChange = useCallback((value: string) => {
    setMarkdownText(value);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.editor}>
        <div className={styles.toolbar}>
          <button onClick={() => {}}>H1</button>
          <button onClick={() => {}}>H2</button>
          <button onClick={() => {}}>H3</button>
          <button className={styles.bold} onClick={() => {}}>
            B
          </button>
          <button className={styles.italic} onClick={() => {}}>
            I
          </button>
          <button onClick={() => {}}>
            <FontAwesomeIcon icon={faCommentDots} />
          </button>
          <button onClick={() => {}}>
            <FontAwesomeIcon icon={faCode} />
          </button>
          <button onClick={() => {}}>
            <FontAwesomeIcon icon={faLink} />
          </button>
          <button onClick={() => {}}>
            <FontAwesomeIcon icon={faImage} />
          </button>
        </div>
        <CodeMirror
          extensions={[
            markdown(),
            EditorView.lineWrapping,
            EditorView.theme({
              '&': { backgroundColor: '#f9f9f9', fontSize: '1rem' },
              '.cm-content': { padding: '1rem' },
              '.cm-gutters': { display: 'none' },
              '&.cm-focused': { outline: 'none' },
              '.cm-activeLine': { backgroundColor: 'transparent' },
            }),
          ]}
          onChange={handleEditorChange}
          value={markdownText}
        />
      </div>
      <div
        className={styles.mirror}
        dangerouslySetInnerHTML={{
          __html: marked(
            markdownText
              .split(/\n{2,}/)
              .map(block => `<p>${block.replace(/\n/g, '<br />')}</p>`)
              .join(''),
          ),
        }}
      />
    </div>
  );
};
