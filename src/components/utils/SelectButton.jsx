// Owner: amelia
// On app.jsx, pass in "create playlist" and "create warmup"
// On AddWarmupFrom, pass in only "create warmup"
// Looks like a + button that opens a dropdown menu with "New Warm-up" and "New Playlist" options

import { useNavigate } from "react-router-dom";

export function SelectButton({ elements }) {
    const navigate = useNavigate();

    const handleSelect = (event) => {
        const value = event.target.value;
        if (value === "warmup") {
            navigate("/createWarmup");
        } else if (value === "playlist") {
            navigate("/create-playlist");
        }
        event.target.value = "";
    };

    return (
        <div className="selectWrap">
            <select className="selectButton" onChange={handleSelect} defaultValue="">
                <option value="" disabled>+</option>
                <option value="warmup">New Warm-up</option>
                {elements === "2" && <option value="playlist">New Playlist</option>}
            </select>
        </div>
    );
}