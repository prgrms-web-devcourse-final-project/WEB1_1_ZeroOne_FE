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
import { useChatWebSocket } from '@/features/chatting/api/chatting.socket';
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
  console.log('HomeView chatRoomData:', chatRoomData);

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
}: ChatViewProps) => {
  const { messages, sendMessage } = useChatWebSocket(selectedRoom?.chatRoomId || 0);

  return (
    <>
      <ChatHeader
        onBack={onBack}
        onLeaveChat={onLeaveChat}
        onShowDropdown={onToggleDropdown}
        showDropdown={showDropdown}
        title={selectedRoom?.username}
      />
      <article className={styles.chatContent}>
        {messages.map((message, index) => (
          <div className={styles.message} key={index}>
            <img alt='profile' className={styles.avatar} src={message.profileImg} />
            <div className={styles.messageContent}>
              <div className={styles.messageHeader}>
                <span className={styles.sender}>{message.userId}</span>
                <span className={styles.time}>{new Date(message.sendAt).toLocaleTimeString()}</span>
              </div>
              <p className={styles.text}>{message.content}</p>
              {message.imgUrls?.map((img, i) => (
                <img alt='첨부 이미지' className={styles.attachment} key={i} src={img.imgUrl} />
              ))}
            </div>
          </div>
        ))}
      </article>
      <ChatInput
        onSendMessage={(message, files) => {
          if (message.trim()) {
            sendMessage(message);
          }
          if (files?.length) {
            console.log('Files:', files);
            // TODO: 파일 업로드 처리
          }
        }}
      />
    </>
  );
};

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
