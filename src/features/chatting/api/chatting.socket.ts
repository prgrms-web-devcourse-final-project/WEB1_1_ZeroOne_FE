import { Client } from '@stomp/stompjs';
import { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';

import { getLocalAccessToken } from '@/features/auth/lib/auth.api';

export interface ChatRequest {
  content: string;
  imgUrls?: { imgUrl: string }[];
}

export interface ChatResponse {
  chatRoomId: number;
  userId: number;
  profileImg: string;
  content: string;
  imgUrls?: { imgUrl: string }[];
  sendAt: string;
}

export const useChatWebSocket = (roomId: number) => {
  const [messages, setMessages] = useState<ChatResponse[]>([]);
  const clientRef = useRef<Client | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<
    'connecting' | 'connected' | 'disconnected'
  >('disconnected');

  useEffect(() => {
    const accessToken = getLocalAccessToken();
    console.log('토큰:', accessToken);
    console.log('채팅방 ID:', roomId);

    setConnectionStatus('connecting');

    const client = new Client({
      webSocketFactory: () => {
        console.log('SockJS 연결 시도...');
        return new SockJS('https://api.palettee.site/ws');
      },
      connectHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
      onConnect: () => {
        console.log('WebSocket 연결 성공!');
        setConnectionStatus('connected');

        try {
          console.log(`채팅방 ${roomId} 구독 시도...`);
          client.subscribe(`/sub/chat/${roomId}`, message => {
            console.log('새 메시지 수신:', message.body);
            try {
              const newMessage = JSON.parse(message.body);
              setMessages(prev => [...prev, newMessage]);
            } catch (error) {
              console.error('메시지 파싱 에러:', error);
            }
          });
          console.log('구독 성공!');
        } catch (error) {
          console.error('구독 중 에러 발생:', error);
        }
      },
      onDisconnect: () => {
        console.log('WebSocket 연결 해제됨');
        setConnectionStatus('disconnected');
      },
      onStompError: error => {
        console.error('STOMP 에러:', error.headers, error.body);
      },
      onWebSocketError: event => {
        console.error('WebSocket 에러:', event);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      debug: str => {
        console.log('STOMP 디버그:', str);
      },
    });

    try {
      console.log('연결 활성화 시도...');
      client.activate();
      clientRef.current = client;
    } catch (error) {
      console.error('연결 활성화 중 에러:', error);
      setConnectionStatus('disconnected');
    }

    return () => {
      console.log('정리(cleanup) 실행 중...');
      if (clientRef.current?.connected) {
        console.log('연결 종료 중...');
        clientRef.current.deactivate();
      }
    };
  }, [roomId]);

  const sendMessage = (content: string, imgUrls?: string[]) => {
    if (!clientRef.current?.connected) {
      console.error('메시지 전송 실패: WebSocket이 연결되지 않음');
      return;
    }

    const message: ChatRequest = {
      content,
      imgUrls: imgUrls?.map(url => ({ imgUrl: url })),
    };

    try {
      console.log(`메시지 전송 시도 - 채팅방 ${roomId}:`, message);
      clientRef.current.publish({
        destination: `/pub/chat/${roomId}`,
        body: JSON.stringify(message),
      });
      console.log('메시지 전송 성공!');
    } catch (error) {
      console.error('메시지 전송 중 에러:', error);
    }
  };

  return {
    messages,
    sendMessage,
    connectionStatus,
  };
};
