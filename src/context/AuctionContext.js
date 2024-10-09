import React, { createContext, useState, useEffect } from 'react';
import { getAuctionItems } from '../service/auctionService';

export const AuctionContext = createContext();

export const AuctionProvider = ({ children }) => {
  const [auctionItems, setAuctionItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getAuctionItems(0, 10); // 페이지, 사이즈 설정
        setAuctionItems(data);
      } catch (error) {
        console.error('Failed to fetch auction items');
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  return (
    <AuctionContext.Provider value={{ auctionItems, loading }}>
      {children}
    </AuctionContext.Provider>
  );
};
