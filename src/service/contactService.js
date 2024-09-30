import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': `${process.env.REACT_APP_API_URL}`
    },
    withCredentials: true
});

export const sendContact = async (contactData) => {
    try {
        const response = await axios.post(`/api/contact`, contactData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('네트워크 에러');
    }
};
