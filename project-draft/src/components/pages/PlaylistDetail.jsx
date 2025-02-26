// Runa's after.html from draft 1
// Display different content based on props, can be either:
// 1. user's custom playlist after adding warmups
// 2. recommended playlist from the main page

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavBar } from "../navigation/NavBar.jsx"; // NavBar
import { Footer } from "../navigation/Footer.jsx"; // Footer
import { NavButton } from "../utils/NavButton.jsx"; // Component 1
import { WarmupItem } from "../utils/WarmupItem.jsx"; // Component 9
import { UploadImageForm } from "../utils/UploadImageForm.jsx";
import warmupData from '../../data/warmup.json'; // Add warmup data


function PlaylistDetail({ selectedWarmups, clearPlaylist }) {
    const navigate = useNavigate();

    return (
        <div className="playlist-detail-container">
            <NavBar />
            
            <div className="playlist-content">
                <div className="playlist-header">
                    <div className="upload-image-container">
                        <h1>Upload Your Playlist Image:</h1>
                        <UploadImageForm />
                    </div>
                    <h2>My Playlist</h2>
                    <button className="play-button">
                        <span className="material-icons">play</span> {/* didn't finish the play buttonyet */}
                    </button>
                </div>
                 
                {/* TODO: add warmups list */}
                <div className="warmups-list">
                    <h3>Selected Warm-ups</h3>
                    {selectedWarmups.length > 0 ? (
                        selectedWarmups.map((warmup) => (
                            <WarmupItem key={warmup.id} warmup={warmup} isSelected={true} />
                        ))
                    ) : (
                        <p>No warmups selected.</p>
                    )}
                </div>

                <div className="navigation-buttons">
                    <NavButton 
                        text="Back to Home" 
                        destination="/" 
                    />
                </div>
            </div>
            
            <Footer />
        </div>
    );
}

export default PlaylistDetail;
