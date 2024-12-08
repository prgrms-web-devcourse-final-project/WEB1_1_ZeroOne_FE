import { useState } from 'react';

import styles from './ChattingModal.module.scss';

import {
  ChatInput,
  ChatRoomItem,
  ChatBottomNav,
  HomeHeader,
  ChatHeader,
} from '@/features/chatting';
import { chatListDummyData } from '@/features/chatting/model/mock';
import { Modal } from '@/shared/ui';

interface ChattingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ChatRoom = {
  chatRoomId: number;
  partnerProfileImg: string;
  partnerName: string;
  recentlyChat: string;
  recentTime: string;
};

export const ChattingModal = ({ isOpen, onClose }: ChattingModalProps) => {
  const [currentView, setCurrentView] = useState<'home' | 'chat'>('home');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(null);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLeaveChat = () => {
    setShowDropdown(false);
    setCurrentView('home');
    setSelectedRoom(null);
  };
  // 더미 데이터를 사용하여 채팅방 목록을 렌더링합니다.
  const chatRooms = chatListDummyData.data.projects.map(room => ({
    chatRoomId: room.chatRoomId,
    partnerProfileImg: room.partnerProfileImg,
    partnerName: room.partnerName,
    recentlyChat: room.recentlyChat,
    recentTime: room.recentTime,
  }));

  const HomeView = () => (
    <>
      <HomeHeader title='채팅 목록' />
      <div className={styles.chatList}>
        {chatRooms.map(room => (
          <ChatRoomItem
            chatRoomId={room.chatRoomId}
            key={room.chatRoomId}
            onClick={() => {
              setCurrentView('chat');
              setSelectedRoom(room);
            }}
            partnerName={room.partnerName}
            partnerProfileImg={room.partnerProfileImg}
            recentTime={room.recentTime}
            recentlyChat={room.recentlyChat}
          />
        ))}
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
        title={selectedRoom?.partnerName}
      />
      <article className={styles.chatContent}>{/* 채팅 메시지들이 들어갈 영역 */}</article>
      <ChatInput
        onSendMessage={(message, files) => {
          // 메시지 전송 로직 구현
          console.log('Message:', message);
          console.log('Files:', files);
        }}
      />
    </>
  );

  return (
    <Modal classNames={styles.modalDialogLayout} isOpen={isOpen} onClose={onClose}>
      <div className={styles.container}>
        {currentView === 'home' ? <HomeView /> : <ChatView />}
        <ChatBottomNav currentView={currentView} onChangeView={setCurrentView} />
      </div>
    </Modal>
  );
};
