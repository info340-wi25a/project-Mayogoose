// hard code 3 options, with state

import { useState } from "react";


export function VisibilityBar() {

    const [visibility, setVisibility] = useState("private");

    const handleSelect = (event) => {
        const value = event.target.value;
        if (value === "private") {
          setVisibility("private");
        }
        else if (value === "public") {
            setVisibility("public");
        }
        else if (value === "unlisted") {
            setVisibility("unlisted");
        }
    };

    return (
        // VisibilityBar not found in index.css
        <div> 
            <select className="selectButton" onChange={handleSelect}>
                <option value="public">Public</option>
                <option value="private">Private</option>
                <option value="unlisted">Unlisted</option>
            </select>
        </div>
    );
}