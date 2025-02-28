import { useEffect, useState } from 'react';

import styles from './MarkdownPreview.module.scss';

import { marked } from '@/shared/lib/mark';

type MarkdownPreviewProps = {
  markdownText: string;
};

export const MarkdownPreview = ({ markdownText }: MarkdownPreviewProps) => {
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    const parsingText = async () => {
      const html = await marked.parse(markdownText);
      setHtmlContent(html);
    };
    void parsingText();
  }, [markdownText]);
  console.log('아카이브 마크다운 컴포넌트 청크 로드 시작');
  return (
    <div
      className={styles.mirror}
      dangerouslySetInnerHTML={{
        __html: htmlContent,
      }}
    />
  );
};
