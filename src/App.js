import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MusicPage from './pages/MusicPage';
import ChatPage from './pages/ChatPage';
import ContactPage from './pages/ContactPage';
import AuctionPage from './pages/AuctionPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Header from './components/Header';

const App = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/music" element={<MusicPage />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/auction" element={<AuctionPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
            </Routes>
        </Router>
    );
};

export default App;
