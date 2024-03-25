import React, { useState, useEffect } from 'react';
import { getNftsFromSolanaWallet } from './solanaApi';

const NftProfile = () => {
    const [nfts, setNfts] = useState([]);

    useEffect(() => {
        getNftsFromSolanaWallet('Stonkystonkster.sol')
            .then(setNfts)
            .catch(console.error);
    }, []);

    return (
        <div className="nft-profile">
            <h1>Web3 Identity: StonkyStonkster</h1>
            <h2>Wallet: Stonkystonkster.sol</h2>
            <div className="nft-grid">
                {nfts.map((nft, index) => (
                    <div key={index} className="nft-item">
                        <img src={nft.image} alt={nft.name} />
                        <p>{nft.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NftProfile;
