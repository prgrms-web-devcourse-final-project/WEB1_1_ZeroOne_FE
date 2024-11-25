import { EditorSelection } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { useCallback } from 'react';

import type { EditorViewRef } from './editor.type';

export const useMarkdown = ({
  editorViewRef,
  setMarkdownText,
}: {
  editorViewRef: EditorViewRef;
  setMarkdownText: (text: string) => void;
}) => {
  const getEditorContent = useCallback(() => {
    return editorViewRef.current?.state.doc.toString() || '';
  }, [editorViewRef]);

  const syncPreview = useCallback(() => {
    setMarkdownText(getEditorContent());
  }, [getEditorContent, setMarkdownText]);

  const insertStartToggle = useCallback(
    (symbol: string, wrap: boolean = false) => {
      const editorView = editorViewRef.current;
      if (!editorView) return;

      editorView.focus();

      const { from, to } = editorView.state.selection.main;
      const selectedText = editorView.state.sliceDoc(from, to);

      if (wrap) {
        const hasExist = selectedText.startsWith(symbol) && selectedText.endsWith(symbol);

        editorView.dispatch({
          changes: {
            from,
            to,
            insert: hasExist
              ? selectedText.slice(symbol.length, selectedText.length - symbol.length)
              : `${symbol}${selectedText}${symbol}`,
          },
          selection: EditorSelection.range(
            from + (hasExist ? -symbol.length : symbol.length),
            to + (hasExist ? -symbol.length : symbol.length),
          ),
        });
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
        editorView.dispatch({
          changes: { from, to, insert: `${symbol}${selectedText}` },
          selection: EditorSelection.cursor(to + symbol.length),
        });
      }
    },
    [editorViewRef],
  );

  const insertImageAtCursor = useCallback((view: EditorView, imageUrl: string) => {
    const { state } = view;
    const { from } = state.selection.main;

    const transaction = state.update({
      changes: { from, to: from, insert: imageUrl },
      selection: { anchor: from + imageUrl.length },
    });

    view.dispatch(transaction);
  }, []);

  const handleImage = useCallback(
    (imageFile: File, view: EditorView) => {
      if (!/image\/(png|jpg|jpeg|gif)/.test(imageFile.type)) return;

      const formData = new FormData();
      formData.append('image', imageFile);

      // TODO: 서버 API 호출 후 이미지 URL 반환
      console.log('Uploading image:', imageFile);

      // Mock image URL
      const mockImageUrl = 'https://example.com/uploaded-image.jpg';
      insertImageAtCursor(view, `![Image](${mockImageUrl})`);
    },
    [insertImageAtCursor],
  );

  const eventHandler = EditorView.domEventHandlers({
    paste(event, view) {
      if (!event.clipboardData) return;

      const { items } = event.clipboardData;

      for (const item of items) {
        if (item.kind === 'file') {
          const file = item.getAsFile();
          if (file) {
            handleImage(file, view);
          }
        }
      }
    },
  });

  return { syncPreview, insertStartToggle, insertImageAtCursor, eventHandler };
};
