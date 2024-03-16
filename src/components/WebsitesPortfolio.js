import React from 'react';
import './WebsitesPortfolio.css';

const WebsitesPortfolio = () => {
    const websites = [
        { name: "Neon Customizer", url: "https://gazzik.netlify.app/", thumbnail: "/assets/neon.gif" },
        { name: "The Day Off Collective", url: "https://thedayoffcollective.netlify.app/", thumbnail: "/assets/day off.gif" },
        // Add more websites as needed
    ];

    return (
        <div className="websites-portfolio">
            <h1>My Websites</h1>
            <div className="cards-container">
                {websites.map((website, index) => (
                    <div key={index} className="card">
                        <div className="card-image">
                            <img src={website.thumbnail} alt={website.name} />
                        </div>
                        <div className="card-content">
                            <h2>{website.name}</h2>
                            <a href={website.url} target="_blank" rel="noopener noreferrer" className="button">Visit Website</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WebsitesPortfolio;
