import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
//import NftProfile from './components/NftProfile';
import WebsitesPortfolio from './components/WebsitesPortfolio';
import Wallet from './components/Wallet';
import NftDisplay from './components/NftDisplay';
import './App.css'

const App = () => {
    return (
        <Wallet>
            <Router>
                <nav>
                    <Link to="/">NFT Profile</Link>
                    <Link to="/websites">Websites Portfolio</Link>
                </nav>
                <Routes>
                    <Route path="/" element={<NftDisplay />} />
                    <Route path="/websites" element={<WebsitesPortfolio />} />
                </Routes>
            </Router>
        </Wallet>
    );
};

export default App;