import React from 'react';
import { Link } from 'react-router-dom';

const AuctionItemCard = ({ item }) => {
  return (
    <div className="auction-item-card">
      <h3>{item.itemName}</h3>
      <p>Starting Price: {item.startingPrice}</p>
      <p>Category: {item.category}</p>
      <Link to={`/auction/${item.id}`}>View Auction</Link>
    </div>
  );
};

export default AuctionItemCard;
