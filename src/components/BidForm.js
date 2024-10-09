import React, { useState } from 'react';

const BidForm = ({ auctionId, handleBid }) => {
  const [bidAmount, setBidAmount] = useState('');

  const submitBid = (e) => {
    e.preventDefault();
    if (bidAmount) {
      handleBid(auctionId, parseFloat(bidAmount));
    }
  };

  return (
    <form onSubmit={submitBid}>
      <input
        type="number"
        value={bidAmount}
        onChange={(e) => setBidAmount(e.target.value)}
        placeholder="Enter your bid amount"
        min="0"
        step="0.01"
      />
      <button type="submit">Place Bid</button>
    </form>
  );
};

export default BidForm;
