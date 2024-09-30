import React, { useState } from 'react';

function ChatForm({ onSend }) {
    const [userInput, setUserInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userInput.trim()) {
            onSend(userInput);
            setUserInput('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                rows="4"
                cols="50"
                placeholder="AAirLine AI에게 어느것이든 이야기해보세요1"
            />
            <br />
            <button type="submit">Send</button>
        </form>
    );
}

export default ChatForm;
