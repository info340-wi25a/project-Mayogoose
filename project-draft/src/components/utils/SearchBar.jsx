// #2 search bar
// owner: amelia

import React, { useState } from "react";
import { SelectButton } from "./SelectButton";

export function SearchBar({ query, setQuery }) {

    const handleChange = (event) => {
        const value = event.target.value;
        setQuery(value);
    }
    
    return (
        <div className="wholeSearchContainer">
            <div className="searchBarContainer">
                <input type="text" className="searchBar" onChange={handleChange} placeholder="Search for something here..."/>
            </div>
            <SelectButton elements="2"/>
        </div>
    );
}