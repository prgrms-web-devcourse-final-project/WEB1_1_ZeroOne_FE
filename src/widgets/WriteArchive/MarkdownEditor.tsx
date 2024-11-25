import { markdown } from '@codemirror/lang-markdown';
import { EditorView } from '@codemirror/view';
import CodeMirror from '@uiw/react-codemirror';
import { useRef, useState, useEffect } from 'react';

import styles from './MarkdownEditor.module.scss';

import { MarkdownPreview, Toolbar, useMarkdown } from '@/features';

export const MarkdownEditor = () => {
  const editorViewRef = useRef<EditorView | null>(null);
  const [markdownText, setMarkdownText] = useState<string>('');
  const [image, setImage] = useState<{ imagePath: string } | null>(null);

  const { syncPreview, insertStartToggle, eventHandler, insertImageAtCursor } = useMarkdown({
    editorViewRef,
    setMarkdownText,
  });

  useEffect(() => {
    if (!editorViewRef.current || !image) return;

    const markdownImage = (path: string) => `![Image](${path})`;
    const text = markdownImage(image.imagePath);

    insertImageAtCursor(editorViewRef.current, text);
  }, [image, insertImageAtCursor]);

  return (
    <div className={styles.container}>
      <div className={styles.editor}>
        <Toolbar
          onCommand={insertStartToggle}
          onInsertImage={() => {
            setImage({ imagePath: 'https://picsum.photos/200/300' });
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
