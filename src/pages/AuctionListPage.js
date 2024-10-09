import React, { useEffect, useState } from 'react';
import { getAuctionItems } from '../service/auctionService';
import AuctionItemCard from '../components/AuctionItemCard';

const AuctionListPage = () => {
  const [auctionItems, setAuctionItems] = useState([]);  // 초기값을 빈 배열로 설정
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(20);

  useEffect(() => {
    const fetchAuctionItems = async () => {
      try {
        const data = await getAuctionItems(page, size);
        // 데이터가 배열인지 확인 후 설정
        if (Array.isArray(data)) {
          setAuctionItems(data);
        } else {
          setAuctionItems([]);  // 배열이 아닐 경우 빈 배열로 처리
        }
      } catch (error) {
        console.error('Failed to fetch auction items', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuctionItems();
  }, [page, size]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Auction Items</h1>
      <div className="auction-items-list">
        {Array.isArray(auctionItems) && auctionItems.length > 0 ? (
          auctionItems.map((item) => <AuctionItemCard key={item.id} item={item} />)
        ) : (
          <p>No auction items found.</p>  // 아이템이 없을 경우 메시지 출력
        )}
      </div>

      {/* 페이지네이션 버튼 추가 */}
      <div>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
        <span> Page {page} </span>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default AuctionListPage;
