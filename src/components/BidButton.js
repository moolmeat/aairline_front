import React from 'react';

const BidButton = ({ onBid, amount }) => {
  return (
    <button onClick={() => onBid(amount)}>
      {amount}로 입찰하기
    </button>
  );
};

export default BidButton;
