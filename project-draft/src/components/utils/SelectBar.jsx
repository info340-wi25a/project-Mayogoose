// Select bar
// Owner: Meiyao

// display passed in props (array of strings) as options

import { useState } from "react";

export function SelectBar({props}) {
    const options = props; // array of strings

    const [selectedOption, setSelectedOption] = useState("");

    const handleSelect = (event) => {
        const value = event.target.value;
        console.log("user selected: " + value);
        setSelectedOption(value);
    };

    // turn [string, string, string] into [<>, <>, <>]
    const selectBar = options.map(option => (
        <option value={option}>{option}</option>
    ));

    return (
        <div> 
            <select className="selectButton" onChange={handleSelect}>
                {selectBar};  
            </select>
        </div>
    );
}