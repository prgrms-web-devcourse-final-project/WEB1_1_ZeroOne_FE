import { markdown } from '@codemirror/lang-markdown';
import { EditorView } from '@codemirror/view';
import CodeMirror from '@uiw/react-codemirror';
import { useRef, useEffect } from 'react';

import styles from './MarkdownEditor.module.scss';

import { MarkdownPreview, Toolbar, useArchiveStore, useMarkdown } from '@/features';

export const MarkdownEditor = () => {
  const editorViewRef = useRef<EditorView | null>(null);

  const { archiveData, updateArchiveData } = useArchiveStore();

  const { syncPreview, insertStartToggle, eventHandler, handleImage } = useMarkdown({
    editorViewRef,
    markdownText: archiveData.description,
    setMarkdownText: markdown => {
      updateArchiveData('description', markdown);
    },
  });

  useEffect(() => {
    if (editorViewRef.current && archiveData.description) {
      syncPreview();
    }
  }, [syncPreview, archiveData.description]);

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
          value={archiveData.description}
        />
      </div>
      <MarkdownPreview markdownText={archiveData.description} />
    </div>
  );
};
