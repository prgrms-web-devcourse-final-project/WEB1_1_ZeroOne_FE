import { markdown } from '@codemirror/lang-markdown';
import { EditorView } from '@codemirror/view';
import CodeMirror from '@uiw/react-codemirror';
import { useRef, useEffect } from 'react';

import styles from './MarkdownEditor.module.scss';

import { MarkdownPreview, Toolbar, useMarkdown } from '@/features';

export interface MarkdownEditorProps<T> {
  data: T;
  updateKey: keyof T;
  onUpdate: <K extends keyof T>(key: K, value: T[K]) => void;
  preview?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MarkdownEditor = <T extends { [key: string]: any }>({
  data,
  updateKey,
  onUpdate,
  preview = true,
}: MarkdownEditorProps<T>) => {
  const editorViewRef = useRef<EditorView | null>(null);

  const { syncPreview, insertStartToggle, eventHandler, handleImage } = useMarkdown({
    editorViewRef,
    markdownText: data[updateKey] as string,
    setMarkdownText: markdown => {
      onUpdate(updateKey, markdown as T[typeof updateKey]);
    },
  });

  useEffect(() => {
    if (editorViewRef.current && data[updateKey]) {
      syncPreview();
    }
  }, [syncPreview, data, updateKey]);

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
            onUpdate(updateKey, newValue as T[typeof updateKey]);
          }}
          onUpdate={update => {
            if (update.view) {
              editorViewRef.current = update.view;
            }
          }}
          value={data[updateKey] as string}
        />
      </div>
      {preview && <MarkdownPreview markdownText={data[updateKey] as string} />}
    </div>
  );
};
