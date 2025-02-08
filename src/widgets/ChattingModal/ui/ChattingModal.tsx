import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import styles from './ChattingModal.module.scss';

import {
  ChatBottomNav,
  ChatHeader,
  ChatInput,
  ChatRoomItem,
  HomeHeader,
} from '@/features/chatting';
import {
  useChattingList,
  useChatHistory,
  useLeaveChatRoom,
} from '@/features/chatting/api/chatting.hook';
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
  const containerRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage } = useChatWebSocket(selectedRoom?.chatRoomId || 0);

  const {
    data: chatHistory,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useChatHistory(selectedRoom?.chatRoomId || 0);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    if (container.scrollTop < 100 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }
  }, [handleScroll]);

  const allMessages = useMemo(() => {
    const historyMessages = chatHistory?.allChats || [];
    const messageMap = new Map([...historyMessages, ...messages].map(msg => [msg.sendAt, msg]));
    return Array.from(messageMap.values()).sort(
      (a, b) => new Date(a.sendAt).getTime() - new Date(b.sendAt).getTime(),
    );
  }, [chatHistory?.allChats, messages]);

  return (
    <>
      <ChatHeader
        onBack={onBack}
        onLeaveChat={onLeaveChat}
        onShowDropdown={onToggleDropdown}
        showDropdown={showDropdown}
        title={selectedRoom?.username}
      />
      <article className={styles.chatContent} ref={containerRef}>
        {isFetchingNextPage && <div className={styles.loadingMore}>이전 메시지 불러오는 중...</div>}
        {allMessages.map(message => (
          <div
            className={`${styles.message} ${message.isMine ? styles.mine : ''}`}
            key={`${message.sendAt}-${message.content}`}
          >
            <img alt='profile' className={styles.avatar} src={message.profileImg} />
            <div className={styles.messageContent}>
              <div className={styles.messageHeader}>
                <span className={styles.sender}>{message.username}</span>
                <span className={styles.time}>{new Date(message.sendAt).toLocaleTimeString()}</span>
              </div>
              <p className={styles.text}>{message.content}</p>
              {/* {message.imgUrls?.map((img, i) => (
                <img alt='첨부 이미지' className={styles.attachment} key={i} src={img.imgUrl} />
              ))} */}
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
  const { mutate: leaveRoom } = useLeaveChatRoom();

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
    if (selectedRoom) {
      leaveRoom(selectedRoom.chatRoomId, {
        onSuccess: () => {
          setShowDropdown(false);
          setCurrentView('home');
          setSelectedRoom(null);
        },
      });
    }
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
