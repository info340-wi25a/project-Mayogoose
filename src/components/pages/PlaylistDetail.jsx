// Owner: Runa
// Display different content based on props, can be either:
// 1. user's custom playlist after adding warmups
// 2. recommended playlist from the main page

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDatabase, ref} from "firebase/database";
import { useNavigate } from 'react-router-dom';
import { NavBar } from "../navigation/NavBar.jsx"; // NavBar
import { Footer } from "../navigation/Footer.jsx"; // Footer
import { NavButton } from "../utils/NavButton.jsx"; // Component 1
import { AddWarmupItem } from "../utils/AddWarmupItem.jsx"; // Component 9
import { UploadImageForm } from "../utils/UploadImageForm.jsx";
import warmupData from '../../data/warmup.json'; // Add warmup data
import playlistData from '../../data/playlist.json'; // Add playlist data
// import PlaylistPlayer from "../components/PlaylistPlayer.jsx"; // Import the player

function PlaylistDetail({ selectedWarmups, clearPlaylist }) {
    const { playlistId } = useParams(); 
    const playlist = playlistData.find(p => p.playlistId === playlistId);

    let warmups = [];
    if (playlist) {
        playlist.warmupIDs.forEach(id => {
            const warmup = warmupData.find(w => w.warmupId.toString() === id.toString());
            if (warmup) {
                warmups.push(warmup);
            }
        });
    } else {
        warmups = selectedWarmups;
    }
    const renderWarmups = (warmups) => {
        return warmups.map((warmup) => (
            <div key={warmup.warmupId} className="warmup-item">
                <img src={warmup.img} alt={warmup.warmupName} className="warmup-image" />
                <div className="warmup-details">
                    <h3>{warmup.warmupName}</h3>
                    <p><strong>Technique:</strong> {warmup.technique}</p>
                    <p><strong>Difficulty:</strong> {warmup["Difficulty Level"]}</p>
                </div>
            </div>
        ));
    };

    const renderSelectedWarmups = (selectedWarmups) => {
        return selectedWarmups.map((warmup) => (
            <AddWarmupItem key={warmup.warmupId} warmup={warmup} isSelected={true} />
        ));
    };

    return (
        <div className="playlist-container">
            <NavBar />

            <div className="playlist-content">
                {/* Recommended Playlist on homepage */}
                {/* ChatGPT provided this ternary operator to help me display either the recommended playlist on the homepage 
                or the user's custom playlist. If we click on the recommended playlist, its details are displayed; 
                otherwise, it shows the user's custom playlist with options to add warmups. */}
                {playlist ? (
                    <>
                        <div className="playlist-detail-header">
                            <img src={playlist.Img} alt={"Cover image for " + playlist.Name + " playlist"} className="playlist-detail-image" />
                            <h1>{playlist.Name}</h1>
                            <div className="playlist-detail-info">
                                <p><strong>Goal:</strong> {playlist.goal}</p>
                                <p><strong>Genre:</strong> {playlist.genre}</p>
                            </div>
                        </div>
                        <div className="warmups-list">
                            <h2>Warm-ups</h2>
                            {warmups.length > 0 && renderWarmups(warmups)}
                        </div>
                    </>
                ) : (

                    // User's custom playlist
                    <>
                        <div className="playlist-header">
                            <div className="upload-image-container">
                                <h2>Upload Your Playlist Image:</h2> {/* Will delete later */}
                                <UploadImageForm />
                            </div>
                            <h3>My Playlist</h3>
                            <button className="play-button" aria-label="Play playlist">
                                <span>▶</span> 
                            </button>
                        </div>

                        {selectedWarmups.length > 0 && (
                        <div className="warmups-list">
                            {renderSelectedWarmups(selectedWarmups)}
                        </div>
                    )}
                    {selectedWarmups.length === 0 && <p>Add Your Warmups</p>}
                    </>
                )}

                <div className="navigation-buttons">
                    <NavButton text="Back to Home" destination="/" />
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default PlaylistDetail;