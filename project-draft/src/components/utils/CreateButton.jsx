// Owner: amelia
// On app.jsx, pass in "create playlist" and "create warmup"
// On AddWarmupFrom, pass in only "create warmup"

import { useNavigate } from "react-router-dom";

export function CreateButton({elements}) {
    const navigate = useNavigate();

    const handleSelect = (event) => {
        const value = event.target.value;
        if (value === "warmup") {
          navigate("/createWarmup");
        } else if (value === "2") {
          navigate("/organize");
        }
    };

    return (

        <div className="createWrap">
            <select className="createButton" onChange={handleSelect} defaultValue="">
                <option value="" disabled>+</option>
                <option value="warmup">New Warm-up</option>
                {elements === "2" && <option value="playlist">New Playlist</option>}
            </select>
        </div>
    );
    
}