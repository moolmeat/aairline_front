import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': `${process.env.REACT_APP_API_URL}`
    },
    withCredentials: true
});

export const getChatGPTResponse = async (userInput) => {
    try {
        const response = await axiosInstance.post(`/api/chat`, { message: userInput }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching response from server:', error);
        return '오류가 발생했습니다. 다시 시도해 주세요.';
    }
};
