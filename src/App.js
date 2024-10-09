import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import MusicPage from './pages/MusicPage';
import ChatPage from './pages/ChatPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Header from './components/Header';
import AuctionListPage from './pages/AuctionListPage';
import AuctionDetailPage from './pages/AuctionDetailPage';
import AddAuctionItemPage from './pages/AddAuctionItemPage';

const App = () => {

    return (
        <AuthProvider>
            <Router>
                <Header />
                <Routes>
                    <Route path="/music" element={<MusicPage />} />
                    <Route path="/chat" element={<ChatPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/auction/:id" element={<AuctionDetailPage />} />
                    <Route path="/auctions" element={<AuctionListPage />} />
                    <Route path="/auction/add" element={<AddAuctionItemPage />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
