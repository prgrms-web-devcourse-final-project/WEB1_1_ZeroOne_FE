import { useEffect, useState } from 'react';

import styles from './GatheringMarkdownPreview.module.scss';

import { marked } from '@/shared/lib/mark';

interface MarkdownPreviewProps {
  markdownText: string;
}

export const GatheringMarkdownPreview = ({ markdownText }: MarkdownPreviewProps) => {
  const [htmlContent, setHtmlContent] = useState('');
  {console.log('마크다운 컴포넌트 청크 로드 시작')}

  useEffect(() => {
    const parsingText = async () => {
      const html = await marked.parse(markdownText);
      setHtmlContent(html);
    };
    void parsingText();
  }, [markdownText]);

  return (
    <div
      className={styles.mirror}
      dangerouslySetInnerHTML={{
        __html: htmlContent,
      }}
      
    />
  );
};
export default GatheringMarkdownPreview;
