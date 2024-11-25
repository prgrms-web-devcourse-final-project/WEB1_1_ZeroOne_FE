import { markdown } from '@codemirror/lang-markdown';
import { EditorView } from '@codemirror/view';
import CodeMirror from '@uiw/react-codemirror';
import { useRef, useState, useEffect } from 'react';

import styles from './MarkdownEditor.module.scss';

import { MarkdownPreview, Toolbar, useMarkdown } from '@/features';

export const MarkdownEditor = () => {
  const editorViewRef = useRef<EditorView | null>(null);
  const [markdownText, setMarkdownText] = useState<string>('');

  const { syncPreview, insertStartToggle, eventHandler, handleImage } = useMarkdown({
    editorViewRef,
    setMarkdownText,
  });

  useEffect(() => {
    syncPreview();
  }, [syncPreview]);

  return (
    <div className={styles.container}>
      <div className={styles.editor}>
        <Toolbar
          onCommand={insertStartToggle}
          onInsertImage={file => {
            if (editorViewRef.current) {
              handleImage(file, editorViewRef.current);
            }
          }}
        />
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
            eventHandler,
          ]}
          onUpdate={update => {
            if (update.view) {
              editorViewRef.current = update.view;
              syncPreview();
            }
          }}
        />
      </div>
      <MarkdownPreview markdownText={markdownText} />
    </div>
  );
};
