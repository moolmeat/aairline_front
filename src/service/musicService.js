import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': `${process.env.REACT_APP_API_URL}`
    },
    withCredentials: true
});

export const getMusicUrl = async (fileName) => {
  try {
    const response = await axiosInstance.get(`/music?fileName=${fileName}`);
    return response.data;
  } catch (error) {
    console.error('음원 URL을 가져오는 중 오류 발생:', error);
    throw error;
  }
};
