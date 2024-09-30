import React, { useState } from 'react';
import BidButton from '../components/BidButton';
import Timer from '../components/Timer';
import { useAuctionWebSocket } from '../service/auctionService';

const AuctionPage = ({ auctionId }) => {
  const { currentPrice, placeBid } = useAuctionWebSocket(auctionId);
  const [bidAmount, setBidAmount] = useState(0);

  return (
    <div>
      <h1>현재 가격: {currentPrice}</h1>
      <Timer endTime={new Date().getTime() + 30 * 60 * 1000} />
      <input
        type="number"
        value={bidAmount}
        onChange={(e) => setBidAmount(e.target.value)}
        placeholder="입찰 금액 입력"
      />
      <BidButton onBid={placeBid} amount={bidAmount} />
    </div>
  );
};

export default AuctionPage;
