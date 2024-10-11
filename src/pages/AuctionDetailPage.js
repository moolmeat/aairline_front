import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { placeBid, subscribeToAuction, disconnectSocket } from '../service/socketService';
import BidForm from '../components/BidForm';
import { getAuctionById } from '../service/auctionService';

const AuctionDetailPage = () => {
  const { id } = useParams();  // 경매 ID 가져오기
  const [auction, setAuction] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [loading, setLoading] = useState(true);  // 로딩 상태 추가

  // WebSocket과 API 호출 관리
  useEffect(() => {
    console.log(`Navigated to auction ID: ${id}`);

    // 경매 데이터 로드 함수
    const fetchAuctionData = async () => {
      try {
        const auctionData = await getAuctionById(id);
        console.log("Received auction data from API:", auctionData);
        setAuction(auctionData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching auction data:", error);
        setLoading(false);
      }
    };

    fetchAuctionData();

    // WebSocket 구독
    subscribeToAuction(id, (updatedAuction) => {
      console.log("Received updated auction data via WebSocket:", updatedAuction);
      setAuction(updatedAuction);
    });

    // 페이지 나갈 때 WebSocket 연결 해제
    return () => {
      console.log("Disconnecting WebSocket");
      disconnectSocket();
    };
  }, [id]);  // ID가 변경될 때만 실행되도록 설정

  // 남은 시간 계산과 업데이트
  useEffect(() => {
    // auction이 로드되고, limitTime과 ended가 있는지 확인한 후 콘솔에 값 출력
    if (auction) {
      console.log("auction:", auction); // auction 전체 객체 로그
      console.log("auction.limitTime:", auction.limitTime); // limitTime 값 로그
      console.log("auction.ended:", auction.ended); // ended 값 로그

      if (auction.limitTime && !auction.ended) {
        console.log("All conditions met, auction is ongoing.");

        const interval = setInterval(() => {
          const now = new Date().getTime();
          const timeLeft = new Date(auction.limitTime).getTime() - now;

          if (timeLeft <= 0) {
            clearInterval(interval);
            setTimeRemaining(0);
            console.log("Auction ended. Disconnecting WebSocket.");
            disconnectSocket();  // 경매 종료 시 웹소켓 연결 해제
          } else {
            setTimeRemaining(timeLeft);
          }
        }, 1000);

        return () => clearInterval(interval);  // 컴포넌트가 언마운트되면 타이머 제거
      } else {
        console.log("Auction is either ended or limitTime is not set.");
      }
    } else {
      console.log("Auction data is not yet loaded.");
    }
  }, [auction?.limitTime, auction?.ended]);

  const handleBid = (bidAmount) => {
    console.log(`Placing bid of ${bidAmount}`);
    placeBid(id, bidAmount, { username: 'User1' });
  };

  if (loading) {
    return <p>Loading auction details...</p>;
  }

  const auctionEnded = auction.ended || timeRemaining <= 0;

  return auction ? (
    <div>
      <h2>{auction.auctionItem.itemName || "Unknown Item"}</h2>
      <p>Description: {auction.auctionItem.description || "No description available"}</p>
      <p>Starting Price: {auction.auctionItem.startingPrice || "N/A"}</p>
      <p>Current Price: {auction.currentPrice || "N/A"}</p>
      <p>Highest Bidder: {auction.highestBidderId || "None"}</p>

      {!auctionEnded ? (
        <BidForm handleBid={handleBid} auctionEndTime={auction.limitTime} />
      ) : (
        <div>
          <h3>Auction Ended</h3>
          {auction.highestBidderId ? (
            <p>{auction.highestBidderId}님이 {auction.currentPrice}원에 낙찰되었습니다!</p>
          ) : (
            <p>No one placed a bid.</p>
          )}
        </div>
      )}
    </div>
  ) : (
    <p>No auction details available.</p>
  );
};

export default AuctionDetailPage;
