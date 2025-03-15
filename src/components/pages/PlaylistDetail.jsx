// Owner: Runa
// Display different content based on props, can be either:
// 1. user's custom playlist after adding warmups
// 2. recommended playlist from the main page

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { getDatabase, ref, onValue} from "firebase/database";
import { useNavigate, useLocation } from 'react-router';
import { NavBar } from "../navigation/NavBar.jsx"; // NavBar
import { Footer } from "../navigation/Footer.jsx"; // Footer
import { NavButton } from "../utils/NavButton.jsx"; // Component 1
import { AddWarmupItem } from "../utils/AddWarmupItem.jsx"; // Component 9
import { UploadImageForm } from "../utils/UploadImageForm.jsx";
// import warmupData from '../../data/warmup.json'; // Add warmup data
// import playlistData from '../../data/playlist.json'; // Add playlist data
import PlaylistPlayer from "../utils/PlaylistPlayer.jsx"; // Import the player

function PlaylistDetail({ selectedWarmups = [], removeWarmup, playlistObj }) {
    const { playlistId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
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
                            }
                        });
                    } else {
                        setWarmups([]);
                    }
                } else {
                    setWarmups([]);
                }
            }
        });
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
        const videoId = extractVideoId(warmup.url);
        if (!videoId) return;
        
        // If clicking the same warmup that's already selected
        if (playingWarmupId === warmup.warmupId) {
            setIsPlaying(!isPlaying);
        } else {
            const videoId = extractVideoId(warmup.url);
            if (videoId) {
                setSelectedUrl(videoId);
                setPlayingWarmupId(warmup.warmupId);
                setIsPlaying(true); 
            }
        }
    };

    let warmupItems;
    
    // the original one
    // if (playlist) {
    //     warmupItems = warmups.map(warmup => (
            
    //         <div key={warmup.warmupId} className="warmup-item">
    //             <img src={warmup.img} alt={warmup.warmupName} className="warmup-image" />
    //             <div className="warmup-details">
    //                 <h3>{warmup.warmupName}</h3>
    //                 <p><strong>Technique:</strong> {warmup.technique}</p>
    //                 <p><strong>Difficulty:</strong> {warmup.difficulty}</p>
    //                 <p><strong>Voice Register:</strong> {warmup.voiceRegister}</p>
    //                 <p><strong>Voice Type:</strong> {warmup.voiceType}</p>
    //                 <button 
    //                     className={`play-button ${playingWarmupId === warmup.warmupId ? 'playing' : ''}`}
    //                     onClick={() => handlePlayWarmup(warmup)} 
    //                     disabled={!warmup.url}
    //                 >
    //                     {playingWarmupId === warmup.warmupId ? '⏸️' : '▶'}
    //                 </button>
    //             </div>
    //         </div>
    //     ));
    // } else {
    //     warmupItems = selectedWarmups.map(warmup => (
    //         <AddWarmupItem 
    //             key={warmup.warmupId} 
    //             warmup={warmup} 
    //             isSelected={true} 
    //             onRemove={removeWarmup} 
    //         />
    //     ));
    // }
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
                        {hasUrl && (
                            <button 
                                className={`play-button ${isThisWarmupPlaying ? 'playing' : ''}`}
                                onClick={() => handlePlayWarmup(warmup)}
                            >
                                {isThisWarmupPlaying ? '⏸️' : '▶️'}
                            </button>
                        )}
                    </div>
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
                    {selectedUrl ? (
                        <PlaylistPlayer selectedUrl={selectedUrl} isPlaying={isPlaying}  /> // Show YouTube player
                    ) : (
                        <img src={playlist.coverImageUrl} 
                             alt={"Cover image for " + playlist.playlistName} 
                             className="playlist-detail-image" />
                    )}
                    <h1>{playlist.playlistName}</h1>
                    <div className="playlist-detail-info">
                        <p><strong>Goal:</strong> {playlist.goal}</p>
                        <p><strong>Genre:</strong> {playlist.genre}</p>
                    </div>
                </div>
                <div className="warmups-list">
                    <h2>Warm-ups</h2>
                    {warmupContent}
                    <button 
                        className="add-warmup-button" 
                        onClick={() => navigate("/addWarmup", { state: { playlistId } })}
                    >
                        Add Warmups
                    </button>
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
        <div className="playlist-container">
            <NavBar />
            <div className="playlist-content">
                {playlistContent}
                <div className="navigation-buttons">
                    <NavButton text="Back to Home" destination="/" />
                </div>
            </div>
            <Footer />
        </div>
    );
}

// the original code:
// function PlaylistDetail({ selectedWarmups = [], removeWarmup }) {
//     const { playlistId } = useParams(); 
//     const navigate = useNavigate(); 
//     const playlist = playlistData.find(p => p.playlistId === playlistId);
//     // const [currentVideoUrl, setCurrentVideoUrl] = useState(null); // Store current playing video
//     const location = useLocation();


//     let warmups = [];
//     if (playlist) {
//         playlist.warmupIDs.forEach(id => {
//             const warmup = warmupData.find(w => w.warmupId.toString() === id.toString());
//             if (warmup) {
//                 warmups.push(warmup);
//             }
//         });
//     } else {
//         warmups = selectedWarmups;
//     }

//     let selectedWarmupItems;
//     if (selectedWarmups.length > 0) {
//         selectedWarmupItems = selectedWarmups.map(warmup => (
//             <AddWarmupItem 
//                 key={warmup.warmupId} 
//                 warmup={warmup} 
//                 isSelected={true} 
//                 onRemove={removeWarmup} 
//             />
//         ));
//     } else {
//         selectedWarmupItems = <p>No warm-ups selected.</p>;
//     }
    

//     // warmups for rendering
//     const warmupItems = warmups.map(warmup => (
//         <div key={warmup.warmupId} className="warmup-item">
//             <img src={warmup.img} alt={warmup.warmupName} className="warmup-image" />
//             <div className="warmup-details">
//                 <h3>{warmup.warmupName}</h3>
//                 <p><strong>Technique:</strong> {warmup.technique}</p>
//                 <p><strong>Difficulty:</strong> {warmup["Difficulty Level"]}</p>
//             </div>
//         </div>
//     ));

//     // Render playlist details or user's custom playlist
//     let playlistContent;
//     if (playlist) {
//         playlistContent = (
//             <>
//                 <div className="playlist-detail-header">
//                     <img src={playlist.Img} alt={"Cover image for " + playlist.Name + " playlist"} className="playlist-detail-image" />
//                     <h1>{playlist.Name}</h1>
//                     <div className="playlist-detail-info">
//                         <p><strong>Goal:</strong> {playlist.goal}</p>
//                         <p><strong>Genre:</strong> {playlist.genre}</p>
//                     </div>
//                 </div>
//                 <div className="warmups-list">
//                     <h2>Warm-ups</h2>
//                     {warmupItems}
//                 </div>
//             </>
//         );
//     } else {
//         playlistContent = (
//             <>
//                 <div className="playlist-header">
//                     <div className="upload-image-container">
//                         <h2>Upload Your Playlist Image:</h2> {/* Will delete later */}
//                         <UploadImageForm />
//                     </div>
//                     <h3>My Playlist</h3>
//                     {/* <button className="play-button" aria-label="Play playlist">
//                         <span>▶</span> 
//                     </button> 改为在每一个warmup后面有个play button */}
//                 </div>

//                 {selectedWarmups.length > 0 && (
//                     <div className="warmups-list">
//                         {selectedWarmups}
//                     </div>
//                 )}
//                 {selectedWarmups.length === 0 && (
//                     <div className="add-warmup-button-container">
//                         <button 
//                             className="add-warmup-button" 
//                             onClick={() => navigate("/addWarmup", { state: { playlistId } })}
//                         >
//                             Add Warmups
//                         </button>
//                     </div>
//                 )}
//                 </>
//             );
//         }

//         return (
//             <div className="playlist-container">
//                 <NavBar />

//                 <div className="playlist-content">
//                     {playlistContent}
//                     <div className="navigation-buttons">
//                         <NavButton text="Back to Home" destination="/" />
//                     </div>
//                 </div>

//                 <Footer />
//             </div>
//         );
// }

export default PlaylistDetail;