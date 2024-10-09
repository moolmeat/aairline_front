import axios from 'axios';

// axiosInstance 설정
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': `${process.env.REACT_APP_API_URL}`
  },
  withCredentials: true
});

// 경매 아이템 추가
export const addAuctionItem = async (auctionItemRequest) => {
  try {
    const response = await axiosInstance.post('/auction/item', auctionItemRequest);
    return response.data;
  } catch (error) {
    console.error('Failed to add auction item', error);
    throw error;
  }
};

// 경매 아이템 목록 가져오기
export const getAuctionItems = async (page, size) => {
  try {
    const response = await axiosInstance.get('/auction', {
      params: { page, size },
    });

    // 응답 데이터 구조에 맞게 수정 (response.data.data에 아이템들이 있다고 가정)
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch auction items', error);
    throw error;
  }
};