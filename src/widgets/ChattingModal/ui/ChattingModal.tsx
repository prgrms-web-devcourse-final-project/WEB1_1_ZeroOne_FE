import { useState } from 'react';

import styles from './ChattingModal.module.scss';

import {
  ChatBottomNav,
  ChatHeader,
  ChatInput,
  ChatRoomItem,
  HomeHeader,
} from '@/features/chatting';
import { useChattingList } from '@/features/chatting/api/chatting.hook';
import type { ChatListResponse, ChatRoom } from '@/features/chatting/api/types';
import { Modal } from '@/shared/ui';

interface ChattingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface HomeViewProps {
  isLoading: boolean;
  chatRoomData: ChatListResponse | undefined;
  onRoomSelect: (room: ChatRoom) => void;
}

const HomeView = ({ isLoading, chatRoomData, onRoomSelect }: HomeViewProps) => {
  console.log('HomeView chatRoomData:', chatRoomData); // 데이터 확인

  // 데이터와 배열 존재 여부를 명시적으로 체크
  const rooms = chatRoomData?.data?.chatRooms;
  const hasRooms = Array.isArray(rooms) && rooms.length > 0;

  return (
    <>
      <HomeHeader title='채팅 목록' />
      <div className={styles.chatList}>
        {isLoading ? (
          <div>로딩 중...</div>
        ) : hasRooms ? (
          rooms.map(room => (
            <ChatRoomItem
              chatRoomId={room.chatRoomId}
              key={room.chatRoomId}
              onClick={() => {
                onRoomSelect(room);
              }}
              profileImg={room.profileImg}
              userId={room.userId}
              username={room.username}
            />
          ))
        ) : (
          <div>채팅방이 없습니다.</div>
        )}
      </div>
    </>
  );
};

interface ChatViewProps {
  selectedRoom: ChatRoom | null;
  onBack: () => void;
  onLeaveChat: () => void;
  showDropdown: boolean;
  onToggleDropdown: () => void;
}

const ChatView = ({
  selectedRoom,
  onBack,
  onLeaveChat,
  showDropdown,
  onToggleDropdown,
}: ChatViewProps) => (
  <>
    <ChatHeader
      onBack={onBack}
      onLeaveChat={onLeaveChat}
      onShowDropdown={onToggleDropdown}
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

export const ChattingModal = ({ isOpen, onClose }: ChattingModalProps) => {
  const [currentView, setCurrentView] = useState<'home' | 'chat'>('home');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(null);

  const { data: chatRoomData, isLoading } = useChattingList();

  const handleRoomSelect = (room: ChatRoom) => {
    setCurrentView('chat');
    setSelectedRoom(room);
  };

  const handleBack = () => {
    setCurrentView('home');
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLeaveChat = () => {
    setShowDropdown(false);
    setCurrentView('home');
    setSelectedRoom(null);
  };

  return (
    <Modal classNames={styles.modalDialogLayout} isOpen={isOpen} onClose={onClose}>
      <div className={styles.container}>
        {currentView === 'home' ? (
          <HomeView
            chatRoomData={chatRoomData}
            isLoading={isLoading}
            onRoomSelect={handleRoomSelect}
          />
        ) : (
          <ChatView
            onBack={handleBack}
            onLeaveChat={handleLeaveChat}
            onToggleDropdown={toggleDropdown}
            selectedRoom={selectedRoom}
            showDropdown={showDropdown}
          />
        )}
        <ChatBottomNav currentView={currentView} onChangeView={setCurrentView} />
      </div>
    </Modal>
  );
};
