// Owner: Runa
// Display different content based on props, can be either:
// 1. user's custom playlist after adding warmups
// 2. recommended playlist from the main page

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { NavBar } from "../navigation/NavBar.jsx"; // NavBar
import { Footer } from "../navigation/Footer.jsx"; // Footer
import { NavButton } from "../utils/NavButton.jsx"; // Component 1
import { WarmupItem } from "../utils/WarmupItem.jsx"; // Component 9
import { UploadImageForm } from "../utils/UploadImageForm.jsx";
import warmupData from '../../data/warmup.json'; // Add warmup data
import playlistData from '../../data/playlist.json'; // Add playlist data

function PlaylistDetail({ selectedWarmups, clearPlaylist }) {
    const { playlistId } = useParams(); 
    let playlist;
    playlistData.forEach(p => {
        if (p.playlistId === playlistId) {
            playlist = p;
        }
    });

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

    return (
        <div className="playlist-detail-container">
            <NavBar />

            <div className="playlist-content">
                {/* Recommended Playlist on homepage */}
                { /*ChatGPT provided this ternary operator to help me display either the recommended playlist on the homepage 
                or the user's custom playlist. If we click on the recommended playlist, its details are displayed; 
                otherwise, it shows the user's custom playlist with options to add warmups. */}
                {playlist ? (
                    <>
                        <img src={playlist.Img} alt={playlist.Name} className="playlist-image" />
                        <h2>{playlist.Name}</h2>
                        <p><strong>Goal:</strong> {playlist.goal}</p>
                        <p><strong>Genre:</strong> {playlist.genre}</p>

                        <div className="warmups-list">
                            <h3>Warm-ups</h3>
                            {warmups.length > 0 && warmups.map((warmup) => (
                                <div key={warmup.warmupId} className="warmup-item">
                                    <img src={warmup.img} alt={warmup.warmupName} className="warmup-image" />
                                    <div className="warmup-details">
                                        <h4>{warmup.warmupName}</h4>
                                        <p><strong>Technique:</strong> {warmup.technique}</p>
                                        <p><strong>Difficulty:</strong> {warmup["Difficulty Level"]}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (

                    // User's custom playlist
                    <>
                        <div className="playlist-header">
                            <div className="upload-image-container">
                                <h1>Upload Your Playlist Image:</h1>
                                <UploadImageForm />
                            </div>
                            <h2>My Playlist</h2>
                        </div>

                        {selectedWarmups.length > 0 && (
                            <div className="warmups-list">
                                {selectedWarmups.map((warmup) => (
                                    <WarmupItem key={warmup.warmupId} warmup={warmup} isSelected={true} />
                                ))}
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
