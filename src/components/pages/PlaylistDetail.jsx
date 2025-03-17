// Owner: Runa
// Display different content based on props, can be either:
// 1. user's custom playlist after adding warmups
// 2. recommended playlist from the main page

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { getDatabase, ref, onValue} from "firebase/database";
import { useNavigate } from 'react-router';
import { Link } from 'react-router';
import { NavBar } from "../navigation/NavBar.jsx"; // NavBar
import { Footer } from "../navigation/Footer.jsx"; // Footer
import { AddWarmupItem } from "../utils/AddWarmupItem.jsx"; // Component 9
import { UploadImageForm } from "../utils/UploadImageForm.jsx";
import PlaylistPlayer from "../utils/PlaylistPlayer.jsx"; // Import the player

function PlaylistDetail({ selectedWarmups = [], removeWarmup, playlistObj, userObj, auth, firebaseUIConfig}) {
    const { playlistId } = useParams();
    const navigate = useNavigate();
    const [playlist, setPlaylist] = useState(playlistObj || null);
    const [warmups, setWarmups] = useState([]);
    const [selectedUrl, setSelectedUrl] = useState(null); // for youtube preview
    const [playingWarmupId, setPlayingWarmupId] = useState(null); // track which warmup is playing
    const [isPlaying, setIsPlaying] = useState(false); // track play/pause state

    useEffect(() => {
        if (!playlistId) return;
        const db = getDatabase();
        const playlistRef = ref(db, "playlists/" + playlistId);

        onValue(playlistRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setPlaylist(data);
                if (data.warmups) {
                    // Fetch complete warmup details from the warmup node
                    const warmupIds = Object.keys(data.warmups);
                    if (warmupIds.length > 0) {
                        const warmupRef = ref(db, "warmup");
                        onValue(warmupRef, (warmupSnapshot) => {
                            const warmupData = warmupSnapshot.val();
                            if (warmupData) {
                                const completeWarmups = warmupIds.map(id => {
                                    const basicInfo = data.warmups[id];
                                    const fullInfo = warmupData[id] || {};
                                    return {
                                        warmupId: id,
                                        warmupName: basicInfo.warmupName || fullInfo.warmupName || "",
                                        img: basicInfo.img || fullInfo.img || "",
                                        technique: fullInfo.technique || "",
                                        difficulty: fullInfo.difficulty || "",
                                        voiceRegister: fullInfo.voiceRegister || "",
                                        voiceType: fullInfo.voiceType || "",
                                        url: fullInfo.url || ""
                                    };
                                });
                                setWarmups(completeWarmups);
                            } else {
                                console.warn("No warmup data found.");
                                setWarmups([]);
                            }
                        },
                        (error) => {
                            console.error("Error fetching warmup data: ", error.message);
                            setWarmups([]);
                        });
                    } else {
                        console.warn("No warmups associated with this playlist.");
                        setWarmups([]);
                    }
                } else {
                    console.warn("Playlist exists but has no warmups")
                    setWarmups([]);
                }
            }
        },
        (error) => {
            consol.error("Error fetching playlist data: ", error.message);
            setPlaylist(null);
        }
    );
}, [playlistId]);


    // Refer to /CreateWarmupForm.jsx
    const extractVideoId = (url) => {
        const match = url.match(
            /(?:youtube\.com\/(?:[^\/]+\/[^\/]+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
        );
        return match ? match[1] : null;
    };

    const handlePlayWarmup = (warmup) => {
        if (!warmup.url) return;
        // Added a null check in the extractVideoId function to prevent errors when URL is undefined (ChatGPT-assisted)
        const videoId = extractVideoId(warmup.url);
        if (!videoId) return;
        
        if (playingWarmupId === warmup.warmupId) {
            setIsPlaying(!isPlaying);
        } else {
            if (videoId) {
                setSelectedUrl(videoId);
                setPlayingWarmupId(warmup.warmupId);
                setIsPlaying(true); 
            }
        }
    };

    let warmupItems;
    if (playlist) {
        warmupItems = warmups.map(warmup => {
            const isThisWarmupPlaying = playingWarmupId === warmup.warmupId && isPlaying;
            const hasUrl = !!extractVideoId(warmup.url);  
            
            return (
                <div key={warmup.warmupId} className="warmup-item">
                    <img src={warmup.img} alt={warmup.warmupName} className="warmup-image" />
                    <div className="warmup-details">
                        <h3>{warmup.warmupName}</h3>
                        <p><strong>Technique:</strong> {warmup.technique}</p>
                        <p><strong>Difficulty:</strong> {warmup.difficulty}</p>
                        <p><strong>Voice Register:</strong> {warmup.voiceRegister}</p>
                        <p><strong>Voice Type:</strong> {warmup.voiceType}</p>
                    </div>
                    {hasUrl && (
                            <button 
                                className={`play-button ${isThisWarmupPlaying ? 'playing' : ''}`}
                                onClick={() => handlePlayWarmup(warmup)}
                            >
                                {isThisWarmupPlaying ? '⏸️' : '▶️'}
                            </button>
                        )}
                </div>
            );
        });
    } else {
        warmupItems = selectedWarmups.map(warmup => (
            <AddWarmupItem 
                key={warmup.warmupId} 
                warmup={warmup} 
                isSelected={true} 
                onRemove={removeWarmup} 
            />
        ));
    }

    let warmupContent;
    if (warmupItems.length > 0) {
        warmupContent = warmupItems;
    } else {
        warmupContent = <p>No warm-ups in this playlist.</p>;
    }

    let playlistContent;
    if (playlist) {
        playlistContent = (
            <>
                <div className="playlist-detail-header">
                    <div className="playlist-media-container">
                        {selectedUrl ? (
                            <PlaylistPlayer selectedUrl={selectedUrl} isPlaying={isPlaying} />
                        ) : (
                            <img 
                                src={playlist.coverImageUrl} 
                                alt={"Cover image for " + playlist.playlistName} 
                                className="playlist-detail-image" 
                            />
                        )}
                    </div>
                    <div className="playlist-info-container">
                        <h1>{playlist.playlistName}</h1>
                        <div className="playlist-detail-info">
                            <p><strong>Goal:</strong> {playlist.goal}</p>
                            <p><strong>Genre:</strong> {playlist.genre}</p>
                        </div>
                    </div>
                </div>
                <div className="warmups-list">
                    <h2>Warm-ups</h2>
                    {warmupContent}
                    <div className="grid-container">
                        <button 
                        className="manage-warmup-button" 
                        onClick={() => navigate("/addWarmup", { state: { playlistId } })}>
                            Manage Warmups
                        </button>
                        <Link to="/" className="badge-pill">Back to Home</Link>
                    </div>
                </div>
            </>
        );
    } else {
        playlistContent = (
            <>
                <div className="playlist-header">
                    <div className="upload-image-container">
                        <h2>Upload Your Playlist Image:</h2>
                        <UploadImageForm />
                    </div>
                    <h3>My Playlist</h3>
                </div>

                {selectedWarmups.length > 0 && (
                    <div className="warmups-list">{warmupItems}</div>
                )}
                {selectedWarmups.length === 0 && (
                    <div className="add-warmup-button-container">
                        <button 
                            className="add-warmup-button" 
                            onClick={() => navigate("/addWarmup", { state: { playlistId } })}
                        >
                            Add Warmups
                        </button>
                    </div>
                )}
            </>
        );
    }

    return (
        <div>
            <NavBar userObj={userObj} auth={auth} firebaseUIConfig={firebaseUIConfig}/>
            <div className="playlist-container">
                <div className="playlist-content">
                    {playlistContent}
                </div>
                <Footer />
            </div>
        </div>
        
    );
}

export default PlaylistDetail;