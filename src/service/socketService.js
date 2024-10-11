import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

let stompClient = null;

// 경매 구독
export const subscribeToAuction = (auctionId, callback) => {
  console.log("Connecting to WebSocket...");
  const socket = new SockJS('http://localhost:8080/auction-websocket');
  stompClient = new Client({
    webSocketFactory: () => socket,
    debug: (str) => {
      console.log("WebSocket Debug:", str);  // 웹소켓 디버그 로그
    },
    onConnect: () => {
      console.log(`WebSocket connected. Subscribing to auction ${auctionId}`);
      stompClient.subscribe(`/topic/auction/${auctionId}`, (message) => {
        const auctionData = JSON.parse(message.body);
        console.log("Received auction data via WebSocket:", auctionData);
        callback(auctionData);  // 서버로부터 받은 경매 정보 전달
      });
    },
    onStompError: (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    },
  });
  stompClient.activate();
};

// 입찰 처리
export const placeBid = (auctionId, bidAmount, user) => {
  if (stompClient && stompClient.connected) {
    const bidData = { auctionId, bidAmount, user };
    console.log("Sending bid data:", bidData);  // 입찰 데이터 로그
    stompClient.publish({
      destination: `/app/placeBid`,
      body: JSON.stringify(bidData),
    });
  }
};

// 웹소켓 연결 해제
export const disconnectSocket = () => {
  if (stompClient) {
    stompClient.deactivate();
    console.log('WebSocket connection closed');
  }
};
