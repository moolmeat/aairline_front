import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { placeBid, startAuction, endAuction, subscribeToAuction, disconnectSocket } from '../service/socketService';
import BidForm from '../components/BidForm';

const AuctionDetailPage = () => {
  const { id } = useParams();  // 경매 ID 가져오기
  const [auction, setAuction] = useState(null);

  useEffect(() => {
    // 서버에 경매 구독
    subscribeToAuction(id, (updatedAuction) => {
      setAuction(updatedAuction);
    });

    // 컴포넌트 언마운트 시 WebSocket 연결 해제
    return () => {
      disconnectSocket();
    };
  }, [id]);

  const handleBid = (bidAmount) => {
    placeBid(id, bidAmount, { username: 'User1' });
  };

  const handleStartAuction = () => {
    startAuction(id, { username: 'User1' });
  };

  const handleEndAuction = () => {
    endAuction(id, { username: 'User1' });
  };

  return auction ? (
    <div>
      <h2>{auction.itemName}</h2>
      <p>Current Price: {auction.currentPrice}</p>
      <p>Highest Bidder: {auction.highestBidderId}</p>
      <BidForm handleBid={handleBid} />
      <button onClick={handleStartAuction}>Start Auction</button>
      <button onClick={handleEndAuction}>End Auction</button>
    </div>
  ) : (
    <p>Loading auction details...</p>
  );
};

export default AuctionDetailPage;
