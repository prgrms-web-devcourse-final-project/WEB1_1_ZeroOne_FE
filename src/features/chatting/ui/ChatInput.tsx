import type { ChangeEvent } from 'react';
import { useState, useRef } from 'react';

import styles from './ChatInput.module.scss';

interface ChatInputProps {
  onSendMessage: (message: string, files?: File[]) => void;
}

export const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() || files.length > 0) {
      onSendMessage(message, files);
      setMessage('');
      setFiles([]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <form className={styles.chatInputContainer} onSubmit={handleSubmit}>
      {files.length > 0 && (
        <div className={styles.previewContainer}>
          {files.map((file, index) => (
            <div className={styles.preview} key={index}>
              {file.type.startsWith('image/') && (
                <img
                  alt='Preview'
                  className={styles.previewImage}
                  src={URL.createObjectURL(file)}
                />
              )}
              <button
                className={styles.removeButton}
                onClick={() => {
                  removeFile(index);
                }}
                type='button'
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
      <div className={styles.inputWrapper}>
        <button
          className={styles.attachButton}
          onClick={() => fileInputRef.current?.click()}
          type='button'
        >
          +
        </button>
        <input
          accept='image/*'
          className={styles.fileInput}
          hidden
          multiple
          onChange={handleFileChange}
          ref={fileInputRef}
          type='file'
        />
        <textarea
          className={styles.messageInput}
          onChange={e => {
            setMessage(e.target.value);
          }}
          onKeyPress={handleKeyPress}
          placeholder='메시지를 입력하세요...'
          rows={1}
          value={message}
        />
        <button
          className={styles.sendButton}
          disabled={!message.trim() && files.length === 0}
          type='submit'
        >
          전송
        </button>
      </div>
    </form>
  );
};
