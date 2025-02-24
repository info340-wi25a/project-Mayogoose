// #11 Select toggle bar
// Owner: Meiyao

// based on playlist database, pass in props for options

// hard code 3 options, with state

import { useState } from "react";

export function SelectPlaylistBar() { // array of objects
    const playlists = playlistsData;

    const [playlist, setPlaylist] = useState("");

    const handleSelect = (event) => {
        const value = event.target.value;
        if (value === "private") {
            setPlaylist(playlist);
        }
    };

    const selectPlaylistBar = playlist.map()

    return (
        // VisibilityBar not found in index.css
        <div> 
            {selectPlaylistBar};
        </div>
    );
}



// <select className="VisibilityButton" onChange={handleSelect}>
{/* <option value="public">Public</option>
<option value="private">Private</option>
<option value="unlisted">Unlisted</option>
</select> */}