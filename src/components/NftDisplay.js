// src/components/NftDisplay.js

import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection } from '@solana/web3.js';
import { programs } from '@metaplex/js';


const ipfsGateway = 'https://ipfs.io/ipfs/';

const resolveIPFS = (url) => {
    if (!url) return null;
    if (url.startsWith('ipfs://')) {
        return `${ipfsGateway}${url.split('ipfs://')[1]}`;
    }
    if (url.includes('ipfs.nftstorage.link')) {
        return `${ipfsGateway}${url.split('/').pop()}`;
    }
    return url;
};

const fetchMetadata = async (uri) => {
    try {
        const resolvedUri = resolveIPFS(uri);
        const response = await fetch(resolvedUri);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const metadata = await response.json();
        return {
            image: resolveIPFS(metadata.image),
            animation_url: resolveIPFS(metadata.animation_url)
        };
    } catch (error) {
        console.error(`[fetchMetadata] Failed to fetch metadata from ${uri}:`, error);
        return { image: 'default_image_url_here', animation_url: null };
    }
};

const fetchNFTs = async (walletAddress) => {
    console.log(`[fetchNFTs] Start fetching NFTs for wallet address: ${walletAddress}`);
    
    const alchemyEndpoint = 'https://solana-mainnet.g.alchemy.com/v2/mWiElK3fB0MSkZjeiTm_HABjmWW1RgAd';
    const connection = new Connection(alchemyEndpoint);

    try {
        const { metadata } = programs;
        const nfts = await metadata.Metadata.findDataByOwner(connection, walletAddress);

        const nftDetails = await Promise.all(nfts.map(async (nft) => {
            const { image, animation_url } = await fetchMetadata(nft.data.uri);
            return {
                mint: nft.mint,
                name: nft.data.name,
                image,
                animation_url
            };
        }));

        return nftDetails;
    } catch (error) {
        console.error(`[fetchNFTs] Error fetching NFTs:`, error);
        throw error;
    }
};

const NftDisplay = () => {
    const [nfts, setNfts] = useState([]);
    const wallet = useWallet();

    useEffect(() => {
        if (wallet.connected && wallet.publicKey) {
            fetchNFTs(wallet.publicKey.toString())
                .then(setNfts)
                .catch(console.error);
        }
    }, [wallet.connected, wallet.publicKey]);

    return (
        <div className="nft-profile">
            <h1>Your NFT Collection</h1>
            <div className="nft-grid">
                {nfts.length > 0 ? (
                    nfts.map((nft, index) => (
                        <div key={index} className="nft-item">
                            {nft.animation_url ? (
                                <video controls style={{ width: '100%', height: '200px', objectFit: 'cover' }}>
                                    <source src={nft.animation_url} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            ) : (
                                <img src={nft.image} alt={nft.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                            )}
                            <p>{nft.name}</p>
                        </div>
                    ))
                ) : (
                    <p>No NFTs found.</p>
                )}
            </div>
        </div>
    );
};

export default NftDisplay;
