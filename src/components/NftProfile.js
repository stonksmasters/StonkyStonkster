import React, { useState, useEffect } from 'react';
import './NftProfile.css';

const NftProfile = () => {
    const [nftData, setNftData] = useState(null);

    useEffect(() => {
        // Mock fetching NFT data
        setNftData({
            name: "StonkyStonkster #1",
            image: "https://example.com/nft-image.jpg",
            description: "My cool NFT"
        });
    }, []);

    if (!nftData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{nftData.name}</h1>
            <img src={nftData.image} alt={nftData.name} />
            <p>{nftData.description}</p>
        </div>
    );
};

export default NftProfile;
