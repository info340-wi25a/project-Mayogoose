// Manage playing and pausing warmups in the playlist
// owner: Runa

import React, { useState } from 'react';

import { useEffect, useRef } from 'react'; 


function PlaylistPlayer({ warmups }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef(new Audio());

}

export default PlaylistPlayer;
