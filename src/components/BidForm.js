import React, { useState, useEffect } from 'react';

const BidForm = ({ handleBid, auctionEndTime }) => {
  const [bidAmount, setBidAmount] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(null);

  useEffect(() => {
    if (auctionEndTime) {
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const timeLeft = new Date(auctionEndTime).getTime() - now;

        if (timeLeft <= 0) {
          clearInterval(interval);
          setTimeRemaining(0);  // 시간이 다 됐을 때 남은 시간을 0으로 설정
        } else {
          setTimeRemaining(timeLeft);  // 남은 시간 업데이트
        }
      }, 1000);

      return () => clearInterval(interval);  // 컴포넌트 언마운트 시 타이머 제거
    }
  }, [auctionEndTime]);

  const submitBid = (e) => {
    e.preventDefault();
    if (bidAmount && timeRemaining > 0) {
      handleBid(parseFloat(bidAmount));  // 시간이 남아있으면 입찰
    } else {
      alert("The auction has ended. You cannot place a bid.");
    }
  };

  return (
    <div>
      <form onSubmit={submitBid}>
        <input
          type="number"
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
          placeholder="Enter your bid amount"
          min="0"
          step="0.01"
        />
        <button type="submit" disabled={timeRemaining <= 0}>Place Bid</button>
      </form>
      {timeRemaining !== null && (
        <p>Time remaining: {new Date(timeRemaining).toISOString().substr(11, 8)}</p>
      )}
    </div>
  );
};

export default BidForm;
