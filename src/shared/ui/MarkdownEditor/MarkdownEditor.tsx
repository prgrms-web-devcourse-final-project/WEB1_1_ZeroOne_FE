import { markdown } from '@codemirror/lang-markdown';
import { EditorView } from '@codemirror/view';
import { lazy, Suspense, useEffect, useRef, useState } from 'react';

import styles from './MarkdownEditor.module.scss';

import { useMarkdown } from '@/features';

// 레이지 로딩으로 변경
const LazyCodeMirror = lazy(() => import('@uiw/react-codemirror'));
const LazyMarkdownPreview = lazy(() =>
  import('@/features').then(module => ({
    default: module.MarkdownPreview,
  })),
);
const LazyToolbar = lazy(() =>
  import('@/features').then(module => ({
    default: module.Toolbar,
  })),
);

export interface MarkdownEditorProps<T> {
  data: T;
  updateKey: keyof T;
  onUpdate: <K extends keyof T>(key: K, value: T[K]) => void;
  preview?: boolean;
}

export const MarkdownEditor = <T extends { [key: string]: any }>({
  data,
  updateKey,
  onUpdate,
  preview = true,
}: MarkdownEditorProps<T>) => {
  const editorViewRef = useRef<EditorView | null>(null);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [isMobile, setIsMobile] = useState(false);

  const { syncPreview, insertStartToggle, eventHandler, handleImage } = useMarkdown({
    editorViewRef,
    markdownText: data[updateKey] as string,
    setMarkdownText: markdown => {
      onUpdate(updateKey, markdown as T[typeof updateKey]);
    },
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1000);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (editorViewRef.current && data[updateKey]) {
      syncPreview();
    }
  }, [syncPreview, data, updateKey]);

  const renderEditor = () => (
    <div className={styles.editor}>
      <Suspense fallback={<div>도구 모음 로딩중...</div>}>
        <LazyToolbar
          onCommand={insertStartToggle}
          onInsertImage={file => {
            if (editorViewRef.current) {
              void handleImage(file, editorViewRef.current);
            }
          }}
        />
      </Suspense>
      <Suspense fallback={<div>에디터 로딩중...</div>}>
        <LazyCodeMirror
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
            if (data[updateKey].length > 2500) return;
            onUpdate(updateKey, newValue as T[typeof updateKey]);
          }}
          onUpdate={update => {
            if (update.view) {
              editorViewRef.current = update.view;
            }
          }}
          value={data[updateKey] as string}
        />
      </Suspense>
    </div>
  );

  const renderPreview = () =>
    preview && (
      <Suspense fallback={<div>프리뷰 로딩중...</div>}>
        <LazyMarkdownPreview markdownText={data[updateKey] as string} />
      </Suspense>
    );
  console.log('아카이빙 마크다운 에디터 프리뷰 아님 컴포넌트 청크 로드 시작');
  return (
    <div className={styles.container}>
      {isMobile ? (
        <>
          <div className={styles.tabs}>
            <button
              className={activeTab === 'editor' ? styles.activeTab : ''}
              onClick={() => {
                setActiveTab('editor');
              }}
            >
              Editor
            </button>
            <button
              className={activeTab === 'preview' ? styles.activeTab : ''}
              onClick={() => {
                setActiveTab('preview');
              }}
            >
              Preview
            </button>
          </div>
          {activeTab === 'editor' && renderEditor()}
          {activeTab === 'preview' && renderPreview()}
        </>
      ) : (
        <div className={styles.desktopLayout}>
          {renderEditor()}
          {renderPreview()}
        </div>
      )}
    </div>
  );
};
