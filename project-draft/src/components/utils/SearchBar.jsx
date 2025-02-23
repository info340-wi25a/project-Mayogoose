// #2 search bar
// owner: amelia

import React, { useState } from "react";
import { CreateButton } from "./CreateButton";

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
            <CreateButton elements="2"/>
        </div>
    );
}