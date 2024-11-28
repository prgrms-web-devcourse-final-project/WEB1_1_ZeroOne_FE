import { markdown } from '@codemirror/lang-markdown';
import { EditorView } from '@codemirror/view';
import CodeMirror from '@uiw/react-codemirror';
import cn from 'classnames';
import { useRef } from 'react';
import { useFormContext, Controller } from 'react-hook-form';

import styles from './GatheringMarkdownEditor.module.scss';
import { GatheringMarkdownPreview } from './GatheringMarkdownPreview';
import { useGatheringMarkdown } from './useGatheringMarkdown';
import type { GatheringFormData } from '../model/types';

interface GatheringMarkdownEditorProps {
  label: string;
  isRequired?: boolean;
}

export const GatheringMarkdownEditor = ({
  label,
  isRequired = false,
}: GatheringMarkdownEditorProps) => {
  const editorViewRef = useRef<EditorView | null>(null);
  const { control } = useFormContext<GatheringFormData>();
  const { insertStartToggle, handleImage } = useGatheringMarkdown({
    editorViewRef,
  });

  return (
    <div className={styles.container}>
      <label className={styles.label}>
        {label}
        {isRequired && <span className={styles.required}>*</span>}
      </label>
      <Controller
        control={control}
        name='content'
        render={({ field: { onChange, value }, fieldState: { error } }) => {
          return (
            <div className={styles.editorWrapper}>
              <div className={styles.editor}>
                <div className={styles.toolbar}>
                  <button
                    className={styles.toolbarButton}
                    onClick={() => {
                      insertStartToggle('bold');
                    }}
                    type='button'
                  >
                    굵게
                  </button>
                  <button
                    className={styles.toolbarButton}
                    onClick={() => {
                      insertStartToggle('italic');
                    }}
                    type='button'
                  >
                    기울임
                  </button>
                  <button
                    className={styles.toolbarButton}
                    onClick={() => {
                      insertStartToggle('heading');
                    }}
                    type='button'
                  >
                    제목
                  </button>
                  <button
                    className={styles.toolbarButton}
                    onClick={() => {
                      insertStartToggle('link');
                    }}
                    type='button'
                  >
                    링크
                  </button>
                  <button
                    className={styles.toolbarButton}
                    onClick={() => {
                      insertStartToggle('code');
                    }}
                    type='button'
                  >
                    코드
                  </button>
                  <label className={styles.imageUpload}>
                    이미지 추가
                    <input
                      accept='image/*'
                      hidden
                      onChange={e => {
                        const file = e.target.files?.[0];
                        if (file && editorViewRef.current) {
                          handleImage(
                            file,
                            // ,editorViewRef.current
                          );
                          return;
                        }
                      }}
                      type='file'
                    />
                  </label>
                </div>
                <div
                  className={cn(styles.editorContainer, {
                    [styles.error]: error,
                  })}
                >
                  <CodeMirror
                    extensions={[
                      markdown(),
                      EditorView.lineWrapping,
                      EditorView.theme({
                        '&': {
                          backgroundColor: '#ffffff',
                          fontSize: '1rem',
                        },
                        '.cm-content': { padding: '1rem' },
                        '.cm-gutters': { display: 'none' },
                        '&.cm-focused': { outline: 'none' },
                        '.cm-activeLine': {
                          backgroundColor: 'transparent',
                        },
                      }),
                    ]}
                    height='500px'
                    onChange={onChange}
                    onUpdate={update => {
                      if (update.view) {
                        editorViewRef.current = update.view;
                      }
                    }}
                    value={value}
                  />
                </div>
                {error && <p className={styles.errorMessage}>{error.message}</p>}
              </div>
              <div className={styles.preview}>
                <div className={styles.previewHeader}>미리보기</div>
                <div className={styles.previewContent}>
                  <GatheringMarkdownPreview markdownText={value || ''} />
                </div>
              </div>
            </div>
          );
        }}
        rules={{
          required: isRequired && '내용을 입력해주세요',
          minLength: {
            value: 10,
            message: '최소 10자 이상 입력해주세요',
          },
        }}
      />
    </div>
  );
};
