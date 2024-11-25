import { markdown } from '@codemirror/lang-markdown';
import { EditorView } from '@codemirror/view';
import CodeMirror from '@uiw/react-codemirror';
import { useRef, useEffect } from 'react';

import styles from './MarkdownEditor.module.scss';

import { MarkdownPreview, Toolbar, useMarkdown } from '@/features';

export const MarkdownEditor = ({
  markdownText,
  updateArchiveData,
}: {
  markdownText: string;
  updateArchiveData: (
    key: string,
    value: string | boolean | { content: string }[] | { url: string }[],
  ) => void;
}) => {
  const editorViewRef = useRef<EditorView | null>(null);

  const { syncPreview, insertStartToggle, eventHandler, handleImage } = useMarkdown({
    editorViewRef,
    setMarkdownText: newValue => {
      updateArchiveData('description', newValue);
    },
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
          onChange={newValue => {
            if (newValue !== markdownText) {
              updateArchiveData('description', newValue);
            }
          }}
          onUpdate={update => {
            if (update.view) {
              editorViewRef.current = update.view;
              syncPreview();
            }
          }}
          value={markdownText}
        />
      </div>
      <MarkdownPreview markdownText={markdownText} />
    </div>
  );
};
