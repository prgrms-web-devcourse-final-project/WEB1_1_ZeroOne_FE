import type { EditorView } from '@codemirror/view';
import { useCallback } from 'react';

interface UseGatheringMarkdownProps {
  editorViewRef: React.RefObject<EditorView>;
}

export const useGatheringMarkdown = ({ editorViewRef }: UseGatheringMarkdownProps) => {
  const insertStartToggle = useCallback((type: string) => {
    if (!editorViewRef.current) return;

    const view = editorViewRef.current;
    const { from, to } = view.state.selection.main;
    const selectedText = view.state.sliceDoc(from, to);

    let text = '';
    switch (type) {
      case 'bold':
        text = `**${selectedText || '굵은 텍스트'}**`;
        break;
      case 'italic':
        text = `*${selectedText || '기울임 텍스트'}*`;
        break;
      case 'heading':
        text = `\n# ${selectedText || '제목'}\n`;
        break;
      case 'link':
        text = `[${selectedText || '링크 텍스트'}](url)`;
        break;
      case 'code':
        text = selectedText ? `\`\`\`\n${selectedText}\n\`\`\`` : '```\n코드를 입력하세요\n```';
        break;
      default:
        return;
    }

    view.dispatch({
      changes: { from, to, insert: text },
      selection: { anchor: from + text.length },
    });
  }, []);

  const handleImage = useCallback(async (file: File, view: EditorView) => {
    try {
      const imageUrl = await uploadImage(file); // 'await' 추가
      const { from } = view.state.selection.main;
      const text = `![${file.name}](${imageUrl})`;

      view.dispatch({
        changes: { from, insert: text },
        selection: { anchor: from + text.length },
      });
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
    }
  }, []);

  // const uploadImage = async (file: File): Promise<string> => {
  //   // TODO: 실제 이미지 업로드 로직 구현
  //   return URL.createObjectURL(file);
  // };

  return {
    insertStartToggle,
    handleImage,
  };
};
