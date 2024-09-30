import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MusicPage from './pages/MusicPage';
import ChatPage from './pages/ChatPage';

const App = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return (
        <Router>
            <Routes>
                <Route path="/music" element={<MusicPage />} />
                <Route path="/chat" element={<ChatPage />} />
            </Routes>
        </Router>
    );
};

export default App;