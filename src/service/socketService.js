import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

let stompClient = null;

// 경매 구독
export const subscribeToAuction = (auctionId, callback) => {
  const socket = new SockJS('http://localhost:8080/auction-websocket');
  stompClient = new Client({
    webSocketFactory: () => socket,
    debug: (str) => {
      console.log(str);
    },
    onConnect: () => {
      console.log('Connected to WebSocket');
      stompClient.subscribe(`/topic/auction/${auctionId}`, (message) => {
        const auctionData = JSON.parse(message.body);
        callback(auctionData);  // 서버로부터 받은 경매 정보
      });
    },
    onStompError: (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    },
  });
  stompClient.activate();
};

// 입찰 기능
export const placeBid = (auctionId, bidAmount, user) => {
  if (stompClient && stompClient.connected) {
    const bidData = { auctionId, bidAmount, user };
    stompClient.publish({
      destination: `/app/placeBid`,  // 서버로 메시지를 송신할 경로
      body: JSON.stringify(bidData),
    });
  }
};

// 경매 시작 기능
export const startAuction = (auctionId, user) => {
  if (stompClient && stompClient.connected) {
    const startData = { auctionId, user };
    stompClient.publish({
      destination: `/app/startAuction`,
      body: JSON.stringify(startData),
    });
  }
};

// 경매 종료 기능
export const endAuction = (auctionId, user) => {
  if (stompClient && stompClient.connected) {
    const endData = { auctionId, user };
    stompClient.publish({
      destination: `/app/endAuction`,
      body: JSON.stringify(endData),
    });
  }
};

// WebSocket 연결 해제
export const disconnectSocket = () => {
  if (stompClient) {
    stompClient.deactivate();
  }
};
