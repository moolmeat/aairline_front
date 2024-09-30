import { useState, useEffect } from 'react';
import useWebSocket from 'react-use-websocket';

export const useAuctionWebSocket = (auctionId) => {
  const [currentPrice, setCurrentPrice] = useState(1000);
  const [timeLeft, setTimeLeft] = useState('');
  const { sendMessage, lastMessage } = useWebSocket(`ws://localhost:8080/auction-websocket`);

  useEffect(() => {
    if (lastMessage !== null) {
      const data = JSON.parse(lastMessage.data);
      setCurrentPrice(data.currentPrice);
    }
  }, [lastMessage]);

  const placeBid = (bidAmount) => {
    sendMessage(JSON.stringify({ auctionId, bidAmount }));
  };

  return { currentPrice, placeBid };
};
