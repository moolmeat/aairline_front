import React, { useState } from 'react';
import ChatForm from '../components/ChatForm';
import { getChatGPTResponse } from '../service/chatService';

function ChatPage() {
    const [chatResponse, setChatResponse] = useState('');

    const handleSend = async (userInput) => {
        const response = await getChatGPTResponse(userInput);
        setChatResponse(response);
    };

    return (
        <div>
            <h1>AAirLine과 채팅하세요!</h1>
            <ChatForm onSend={handleSend} />
            <div>
                <h3>AAirLine AI의 응답</h3>
                <p>{chatResponse}</p>
            </div>
        </div>
    );
}

export default ChatPage;
