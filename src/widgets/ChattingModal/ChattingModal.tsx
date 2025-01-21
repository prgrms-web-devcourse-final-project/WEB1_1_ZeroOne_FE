import { useState } from 'react';

import styles from './ChattingModal.module.scss';

import { ChatInput, ChatRoomItem, HomeHeader, ChatHeader } from '@/features/chatting';
import { useChattingList } from '@/features/chatting/api/chatting.hook';
import { Modal } from '@/shared/ui';

interface ChattingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ChatRoom = {
  chatRoomId: number;
  userId: number;
  username: string;
  profileImg: string;
};

export const ChattingModal = ({ isOpen, onClose }: ChattingModalProps) => {
  const [currentView, setCurrentView] = useState<'home' | 'chat'>('home');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(null);

  // 채팅방 목록 데이터 불러오기
  const { data: chatRoomData, isLoading } = useChattingList();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLeaveChat = () => {
    setShowDropdown(false);
    setCurrentView('home');
    setSelectedRoom(null);
  };

  const HomeView = () => (
    <>
      <HomeHeader title='채팅 목록' />
      <div className={styles.chatList}>
        {isLoading ? (
          <div>로딩 중...</div>
        ) : (
          chatRoomData?.data.ChatRooms.map(room => (
            <ChatRoomItem
              chatRoomId={room.chatRoomId}
              key={room.chatRoomId}
              onClick={() => {
                setCurrentView('chat');
                setSelectedRoom(room);
              }}
              profileImg={room.profileImg}
              username={room.username}
            />
          ))
        )}
      </div>
    </>
  );

  const ChatView = () => (
    <>
      <ChatHeader
        onBack={() => {
          setCurrentView('home');
        }}
        onLeaveChat={handleLeaveChat}
        onShowDropdown={toggleDropdown}
        showDropdown={showDropdown}
        title={selectedRoom?.username}
      />
      <article className={styles.chatContent}>{/* 채팅 메시지들이 들어갈 영역 */}</article>
      <ChatInput
        onSendMessage={(message, files) => {
          console.log('Message:', message);
          console.log('Files:', files);
        }}
      />
    </>
  );

  return (
    <Modal classNames={styles.modalDialogLayout} isOpen={isOpen} onClose={onClose}>
      <div className={styles.container}>{currentView === 'home' ? <HomeView /> : <ChatView />}</div>
    </Modal>
  );
};
