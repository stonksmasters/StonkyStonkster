import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import NftProfile from './components/NftProfile';
import WebsitesPortfolio from './components/WebsitesPortfolio';
import './App.css'

const App = () => {
    return (
        <Router>
            <nav>
                <Link to="/">NFT Profile</Link>
                <Link to="/websites">Websites Portfolio</Link>
            </nav>
            <Routes>
                <Route path="/" element={<NftProfile />} />
                <Route path="/websites" element={<WebsitesPortfolio />} />
            </Routes>
        </Router>
    );
};

export default App;
