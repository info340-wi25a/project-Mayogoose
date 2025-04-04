// #2 search bar
// owner: amelia

import React, { useState } from "react";
import { SelectButton } from "./SelectButton";

export function SearchBar({ userObj, setQuery, auth, firebaseUIConfig }) {

    const handleChange = (event) => {
        const value = event.target.value;
        setQuery(value);
    }
    
    return (
        <div className="wholeSearchContainer">
            <div className="searchBarContainer">
                <input type="text" className="searchBar" onChange={handleChange} placeholder="Search for something here..."/>
            </div>
            <SelectButton userObj={userObj} elements="2" auth={auth} firebaseUIConfig={firebaseUIConfig}/>
        </div>
    );
}