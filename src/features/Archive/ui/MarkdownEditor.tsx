import { markdown } from '@codemirror/lang-markdown';
import { EditorSelection } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { faCommentDots, faImage, faLink, faCode } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CodeMirror from '@uiw/react-codemirror';
import hljs from 'highlight.js';
import type { DebouncedFunc } from 'lodash-es/debounce';
import debounce from 'lodash-es/debounce';
import { marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import { useState, useRef } from 'react';
import 'highlight.js/styles/github.css';

import styles from './MarkdownEditor.module.scss';

marked.use(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      if (code.trim() === '') {
        return hljs.highlight('', { language: 'plaintext' }).value;
      }

      if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(code, { language: lang }).value;
      }
      return hljs.highlight(code, { language: 'plaintext' }).value;
    },
  }),
);

marked.setOptions({
  breaks: true,
  gfm: true,
});

export const MarkdownEditor = () => {
  const editorViewRef = useRef<EditorView | null>(null);
  const [markdownText, setMarkdownText] = useState<string>('');

  const getEditorContent = () => {
    return editorViewRef.current?.state.doc.toString() || '';
  };

  const syncPreview: DebouncedFunc<() => void> = debounce(() => {
    setMarkdownText(getEditorContent());
  }, 10);

  const insertStartToggle = (symbol: string, wrap: boolean = false) => {
    const editorView = editorViewRef.current;
    if (!editorView) return;

    editorView.focus();

    const { from, to } = editorView.state.selection.main;
    const selectedText = editorView.state.sliceDoc(from, to);

    if (wrap) {
      const hasExist = selectedText.startsWith(symbol) && selectedText.endsWith(symbol);

      if (!hasExist) {
        editorView.dispatch({
          changes: {
            from,
            to,
            insert: `${symbol}${selectedText}${symbol}`,
          },
          selection: EditorSelection.range(from + symbol.length, to + symbol.length),
        });
      } else {
        editorView.dispatch({
          changes: {
            from,
            to,
            insert: selectedText.slice(symbol.length, selectedText.length - symbol.length),
          },
          selection: EditorSelection.range(from, to - 2 * symbol.length),
        });
      }
    } else if (symbol === '```') {
      editorView.dispatch({
        changes: {
          from,
          to,
          insert: `\`\`\`\n${selectedText}\n\`\`\``,
        },
        selection: EditorSelection.cursor(to + 4),
      });
    } else {
      const line = editorView.state.doc.lineAt(from);
      const { from: lineStart, to: lineEnd, text } = line;

      const hasExist = text.startsWith(symbol);

      if (!hasExist) {
        editorView.dispatch({
          changes: {
            from: lineStart,
            to: lineEnd,
            insert: `${symbol}${text}`,
          },
          selection: EditorSelection.cursor(lineStart + symbol.length),
        });
      } else {
        editorView.dispatch({
          changes: {
            from: lineStart,
            to: lineEnd,
            insert: text.slice(symbol.length),
          },
          selection: EditorSelection.cursor(lineStart),
        });
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.editor}>
        <div className={styles.toolbar}>
          <button
            onClick={() => {
              insertStartToggle('# ');
            }}
          >
            H1
          </button>
          <button
            onClick={() => {
              insertStartToggle('## ');
            }}
          >
            H2
          </button>
          <button
            onClick={() => {
              insertStartToggle('### ');
            }}
          >
            H3
          </button>
          <button
            className={styles.bold}
            onClick={() => {
              insertStartToggle('**', true);
            }}
          >
            B
          </button>
          <button
            className={styles.italic}
            onClick={() => {
              insertStartToggle('_', true);
            }}
          >
            I
          </button>
          <button
            onClick={() => {
              insertStartToggle('> ');
            }}
          >
            <FontAwesomeIcon icon={faCommentDots} />
          </button>
          <button
            onClick={() => {
              insertStartToggle('```');
            }}
          >
            <FontAwesomeIcon icon={faCode} />
          </button>
          <button
            onClick={() => {
              insertStartToggle('[Link](url)');
            }}
          >
            <FontAwesomeIcon icon={faLink} />
          </button>
          <button
            onClick={() => {
              insertStartToggle('![Image](url)');
            }}
          >
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
          onUpdate={update => {
            if (update.view) {
              editorViewRef.current = update.view;
              syncPreview();
            }
          }}
        />
      </div>
      <div
        className={styles.mirror}
        dangerouslySetInnerHTML={{
          __html: marked(markdownText),
        }}
      />
    </div>
  );
};
