import { Client } from '@stomp/stompjs';
import { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';

import { getLocalAccessToken } from '@/features/auth/lib/auth.api';

// Types
interface ChatMessage {
  content: string;
  imgUrls: { imgUrl: string }[];
}

interface ChatResponse {
  chatRoomId: number;
  email: string;
  profileImg: string;
  content: string;
  imgUrls: { imgUrl: string }[];
  sendAt: string;
}

type ConnectionStatus = 'connecting' | 'connected' | 'disconnected';

// Constants
const CONFIG = {
  MAX_RECONNECT_ATTEMPTS: 5,
  SOCKET_TIMEOUT: 20000,
  RECONNECT_DELAY: 5000,
  MESSAGE_TIMEOUT: 5000,
  API_URL: 'https://api.palettee.site/ws',
} as const;

export const useChatWebSocket = (roomId: number) => {
  const [messages, setMessages] = useState<ChatResponse[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('disconnected');
  const [error, setError] = useState<string | null>(null);

  const clientRef = useRef<Client | null>(null);
  const messageQueueRef = useRef<ChatMessage[]>([]);
  const reconnectCountRef = useRef(0);
  const subscriptionRef = useRef<any>(null);
  const isActiveRef = useRef(true);

  const createStompClient = () => {
    return new Client({
      webSocketFactory: () =>
        new SockJS(CONFIG.API_URL, null, {
          timeout: CONFIG.SOCKET_TIMEOUT,
          transports: ['websocket', 'xhr-streaming', 'xhr-polling'],
        }),
      connectHeaders: {
        Authorization: `Bearer ${getLocalAccessToken()}`,
        Origin: window.location.origin,
        'Content-Type': 'application/json',
      },
      onConnect: handleConnect,
      onDisconnect: handleDisconnect,
      onStompError: handleStompError,
      onWebSocketError: handleWebSocketError,
      onWebSocketClose: handleWebSocketClose,
      reconnectDelay: CONFIG.RECONNECT_DELAY,
      connectionTimeout: CONFIG.SOCKET_TIMEOUT,
      debug: str => {
        console.log('[STOMP Debug]:', str);
      },
    });
  };

  const handleConnect = () => {
    console.log('Connected to STOMP');
    setConnectionStatus('connected');
    setError(null);
    reconnectCountRef.current = 0;

    setTimeout(() => {
      if (isActiveRef.current && clientRef.current?.connected) {
        subscribeToChat();
        processMessageQueue();
      }
    }, 500);
  };

  const handleDisconnect = () => {
    console.log('Disconnected from STOMP');
    setConnectionStatus('disconnected');
    handleReconnect();
  };

  const handleStompError = (error: any) => {
    console.error('STOMP error:', error);
    if (error.headers?.message?.includes('unauthorized')) {
      setError('인증이 만료되었습니다. 다시 로그인해주세요.');
      return;
    }
    setConnectionStatus('disconnected');
    handleReconnect();
  };

  const handleWebSocketError = (error: Event) => {
    console.error('WebSocket error:', error);
    setConnectionStatus('disconnected');
    handleReconnect();
  };

  const handleWebSocketClose = (event: CloseEvent) => {
    console.log('WebSocket closed:', event);
    if (event.code !== 1000) {
      handleReconnect();
    }
  };

  const subscribeToChat = () => {
    if (!clientRef.current || !clientRef.current.connected) {
      console.log('Connection not ready, retrying subscription...');
      setTimeout(subscribeToChat, 1000);
      return;
    }

    try {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
        subscriptionRef.current = null;
      }

      console.log('Subscribing to chat room:', roomId);
      const subscription = clientRef.current.subscribe(`/sub/chat/${roomId}`, message => {
        console.log('Received message:', message);
        try {
          const newMessage: ChatResponse = JSON.parse(message.body);
          setMessages(prev => {
            const isDuplicate = prev.some(
              msg =>
                msg.sendAt === newMessage.sendAt &&
                msg.email === newMessage.email &&
                msg.content === newMessage.content,
            );
            if (isDuplicate) {
              console.log('Duplicate message detected');
              return prev;
            }
            console.log('Adding new message to state');
            return [...prev, newMessage];
          });
        } catch (error) {
          console.error('Message parsing error:', error);
        }
      });

      subscriptionRef.current = subscription;
      console.log('Successfully subscribed to chat');
    } catch (error) {
      console.error('Subscription error:', error);
      handleReconnect();
    }
  };

  const processMessageQueue = () => {
    const queue = [...messageQueueRef.current];
    messageQueueRef.current = [];

    queue.forEach(message => {
      sendMessage(
        message.content,
        message.imgUrls.map(img => img.imgUrl),
      );
    });
  };

  const handleReconnect = () => {
    if (reconnectCountRef.current >= CONFIG.MAX_RECONNECT_ATTEMPTS) {
      setError('재연결에 실패했습니다. 페이지를 새로고침해주세요.');
      return;
    }

    const delay = Math.min(1000 * Math.pow(2, reconnectCountRef.current), 30000);
    reconnectCountRef.current += 1;

    console.log(`Attempting reconnect in ${delay}ms...`);
    setTimeout(reconnect, delay);
  };

  const reconnect = () => {
    if (clientRef.current?.connected) {
      clientRef.current.deactivate();
      clientRef.current = null;
    }
    setupWebSocket();
  };

  const setupWebSocket = async () => {
    if (!roomId || roomId <= 0 || !getLocalAccessToken()) {
      setError('연결 정보가 올바르지 않습니다.');
      return;
    }

    try {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
        subscriptionRef.current = null;
      }

      if (clientRef.current?.connected) {
        await clientRef.current.deactivate();
        clientRef.current = null;
      }

      await new Promise(resolve => setTimeout(resolve, 1000));

      setConnectionStatus('connecting');
      setError(null);

      const client = createStompClient();
      clientRef.current = client;
      client.activate();
    } catch (error) {
      console.error('Setup error:', error);
      setConnectionStatus('disconnected');
      handleReconnect();
    }
  };

  const sendMessage = async (content: string, imgUrls?: string[]) => {
    if (!content.trim()) return;

    if (!clientRef.current?.connected) {
      console.log('Connection lost, queueing message');
      messageQueueRef.current.push({
        content,
        imgUrls: imgUrls ? imgUrls.map(url => ({ imgUrl: url })) : [],
      });

      if (connectionStatus === 'disconnected') {
        reconnect();
      }
      return;
    }

    try {
      const accessToken = getLocalAccessToken();
      if (!accessToken) throw new Error('인증 토큰이 없습니다.');

      // 메시지 객체 구조 단순화
      const message: ChatMessage = {
        content: content.trim(),
        imgUrls: imgUrls ? imgUrls.map(url => ({ imgUrl: url.trim() })) : [],
      };

      console.log('Sending message:', message);
      console.log('JSON stringify result:', JSON.stringify(message));

      clientRef.current.publish({
        destination: `/pub/chat/${roomId}`,
        body: JSON.stringify(message),
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log('Message sent successfully');
    } catch (error) {
      console.error('Send message error:', error);
      messageQueueRef.current.push({
        content,
        imgUrls: imgUrls ? imgUrls.map(url => ({ imgUrl: url })) : [],
      });

      if (!clientRef.current?.connected) {
        handleReconnect();
      }
    }
  };

  useEffect(() => {
    console.log('Setting up WebSocket for room:', roomId);
    isActiveRef.current = true;
    setupWebSocket();

    return () => {
      console.log('Cleaning up WebSocket connection');
      isActiveRef.current = false;

      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
        subscriptionRef.current = null;
      }

      if (clientRef.current?.connected) {
        clientRef.current.deactivate();
        clientRef.current = null;
      }

      messageQueueRef.current = [];
    };
  }, [roomId]);

  return {
    messages,
    sendMessage,
    connectionStatus,
    error,
    reconnect: () => {
      reconnectCountRef.current = 0;
      reconnect();
    },
  };
};
