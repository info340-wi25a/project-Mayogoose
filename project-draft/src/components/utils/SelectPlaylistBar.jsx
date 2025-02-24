// #11 Select toggle bar
// Owner: Meiyao

// based on playlist database, pass in props for options

// hard code 3 options, with state

import { useState } from "react";

export function SelectPlaylistBar({props}) { // array of objects
    const playlists = props;

    const [playlist, setPlaylist] = useState("");

    const handleSelect = (event) => {
        const value = event.target.value;
        if (value === "private") {
            setPlaylist(playlist);
        }
    };

    const selectPlaylistBar = playlists.map(playlist => (
        <option value={playlist.Name}>{playlist.Name}</option>
    ));

    return (
        // VisibilityBar not found in index.css
        <div> 
            <select className="VisibilityButton" onChange={handleSelect}>
                {selectPlaylistBar};  
            </select>
        </div>
    );
}