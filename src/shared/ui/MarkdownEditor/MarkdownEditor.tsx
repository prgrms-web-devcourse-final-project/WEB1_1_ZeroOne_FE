import { markdown } from '@codemirror/lang-markdown';
import { EditorView } from '@codemirror/view';
import CodeMirror from '@uiw/react-codemirror';
import { useRef, useEffect } from 'react';

import styles from './MarkdownEditor.module.scss';

import type { BaseArchiveDTO } from '@/features';
import { MarkdownPreview, Toolbar, useMarkdown } from '@/features';

export const MarkdownEditor = ({
  markdownText,
  updateArchiveData,
}: {
  markdownText: string;
  updateArchiveData: <T extends keyof BaseArchiveDTO>(key: T, value: BaseArchiveDTO[T]) => void;
}) => {
  const editorViewRef = useRef<EditorView | null>(null);

  const { syncPreview, insertStartToggle, eventHandler, handleImage } = useMarkdown({
    editorViewRef,
    markdownText,
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
            updateArchiveData('description', newValue);
          }}
          onUpdate={update => {
            if (update.view) {
              editorViewRef.current = update.view;
            }
          }}
        />
      </div>
      <MarkdownPreview markdownText={markdownText} />
    </div>
  );
};
