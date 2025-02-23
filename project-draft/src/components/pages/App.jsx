// Amelia's index.html, main.jsx first render this page
import React from 'react';
import { useState } from 'react';

// Import other pages
// import { upload } from "./Upload.jsx"; // meiyao: upload individual warmup
// import { NewPlaylist } from "./NewPlaylist.jsx"; // ellie: upload playlist

// import { NavBar } from "./navigation/NavBar.jsx";

import { Button } from "../utils/NavButton.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import { PlaylistCards } from '../utils/PlaylistCards.jsx';
import { SearchBar } from '../utils/SearchBar.jsx';

import CreateWarmupForm from "./CreateWarmupForm.jsx"

import albumsData from '../../data/data.json'

function App() {

    const [query, setQuery] = useState("");

    const getFilteredAlbums = (query, albums) => {
        if (!query) {
            return albums;
        }
        return albums.filter(album => album.Name.includes(query))
    }    

    const filteredAlbums = getFilteredAlbums(query, albumsData);

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <div>
                            <br/>
                            <br/>
                            <SearchBar query={query} setQuery={setQuery} />
                            <br/>
                            <br/>
                            <br/>
                            <PlaylistCards albumsData={filteredAlbums} />
                        </div>
                    }
                />
                <Route path="/createWarmup" element={<CreateWarmupForm />} />
            </Routes>
        </Router>
    );
}
  
export default App;