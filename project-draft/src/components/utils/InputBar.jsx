// #10 text input bar, shared by meiyao and ellie for upload configurations
// Owner: Meiyao

// <div class="input-box">
// <label for="linkInput" class="form-label"> Upload from URL / YouTube:</label>
// <input type="link" class="form-control" id="linkInput" placeholder="Enter a link to upload a vocal warm-up, http://...">
// </div>

import React from 'react';
import { useState } from "react";

export function InputBar({ placeholder, onChange, onEnterPress}) {
  const [inputValue, setInputValue] = useState("");
  const [videoId, setVideoId] = useState(null);

  // extract YouTube Preview Links
  const extractVideoId = (url) => {
    const match = url.match(
      /(?:youtube\.com\/(?:[^\/]+\/[^\/]+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    );
    return match ? match[1] : null;
  };

  // Micro managing input and change states
  const handleChange = (event) => {
    const input = event.target.value;
    console.log("user typed in this url: " + input);
    setInputValue(input);

    const extractedVideoId = extractVideoId(input);
    console.log("extracted YouTube url: " + extractedVideoId);
    setVideoId(extractedVideoId);
  };

  // Only show YouTube Preview if valid ID exists
  const showYouTubePreview = () => {
    if (videoId !== null) {
      return <YouTube videoId={videoId} opts={{ width: "100%", height: "300" }} />
    }
  }

  // testing links
  // https://www.youtube.com/watch?v=zjGNmDqTgeo&t=15s
  // https://youtu.be/TmJYZ8y-VmM?si=pwin9eWJ2ZMB313V
  // https://youtu.be/YCLyAmXtpfY?si=o7e5YkTgjZm4QJcS


  return (
    <div>
      <input
        type="text"
        value={inputValue}
        placeholder={placeholder}      
        onChange={handleChange}
        className={"input-box"}
      />
      { showYouTubePreview() }
    </div>
  );
}

export default InputBar;