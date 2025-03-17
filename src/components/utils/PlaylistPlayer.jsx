// Manage playing and pausing warmup player in the playlist
// owner: Runa
import React, { useEffect, useRef } from 'react';

function PlaylistPlayer({ selectedUrl, isPlaying = true }) {
    const playerRef = useRef(null);
    const playerContainerRef = useRef(null);
    
    useEffect(() => {
        // Clean up any existing player 
        if (playerRef.current) {
            playerRef.current.destroy();
            playerRef.current = null;
        }
        
        if (playerContainerRef.current) {
            // I searched on stack overflow to help me clear previous player container
            while (playerContainerRef.current.firstChild) {
                playerContainerRef.current.removeChild(playerContainerRef.current.firstChild);
            }
            
            const playerElement = document.createElement('div');
            playerElement.id = `youtube-player-${Date.now()}`;
            playerContainerRef.current.appendChild(playerElement);
            
            // Initialize YouTube player - ChatGPT assisted
            loadYouTubeAPI().then(() => {
                playerRef.current = new window.YT.Player(playerElement.id, {
                    height: '360',
                    width: '100%',
                    videoId: selectedUrl,
                    playerVars: {
                        autoplay: isPlaying ? 1 : 0,
                        controls: 1
                    }
                });
            });
        }
        
        return () => {
            if (playerRef.current) {
                playerRef.current.destroy();
                playerRef.current = null;
            }
        };
    }, [selectedUrl]);
    
    // Effect to handle play/pause state - also refer to the stack overflow 
    useEffect(() => {
        if (playerRef.current && playerRef.current.getPlayerState) {
            try {
                if (isPlaying) {
                    playerRef.current.playVideo();
                } else {
                    playerRef.current.pauseVideo();
                }
            } catch (error) {
                console.error("Error", error);
            }
        }
    }, [isPlaying]);
    
    const loadYouTubeAPI = () => {
        return new Promise((resolve) => {
            if (window.YT && window.YT.Player) {
                resolve();
                return;
            }

            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            
            window.onYouTubeIframeAPIReady = () => {
                resolve();
            };
            
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        });
    };
    
    return <div ref={playerContainerRef} className="youtube-player-container"></div>;
}

export default PlaylistPlayer;
