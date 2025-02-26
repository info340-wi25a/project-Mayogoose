// Amelia's index.html, main.jsx first render this page
import React from 'react';
import { useState } from 'react';
import { NavBar } from '../navigation/NavBar.jsx';
import { Footer } from '../navigation/Footer.jsx';
import { CreatePlaylistForm } from "./CreatePlaylistForm.jsx";
// Import other pages
// import { upload } from "./Upload.jsx"; // meiyao: upload individual warmup
// import { NewPlaylist } from "./NewPlaylist.jsx"; // ellie: upload playlist

import { NavButton } from "../utils/NavButton.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import { PlaylistCards } from '../utils/PlaylistCards.jsx';
import { SearchBar } from '../utils/SearchBar.jsx';

// Runa's warmup form
// import { WarmupItem } from "../utils/WarmupItem.jsx"
import AddWarmupForm from "./AddWarmupForm.jsx"
import PlaylistDetail from "./PlaylistDetail.jsx"

import CreateWarmupForm from "./CreateWarmupForm.jsx"
import albumsData from '../../data/playlist.json'



function App() {
    const [query, setQuery] = useState("");
    const [selectedWarmups, setSelectedWarmups] = useState([]);

    const getFilteredAlbums = (query, albums) => {
        if (!query) {
            return albums;
        }
        return albums.filter(album => album.Name.includes(query))
    }    

    const filteredAlbums = getFilteredAlbums(query, albumsData);


    // runa: selectedWarmups
    const addWarmupToPlaylist = (warmup) => {
        setSelectedWarmups([...selectedWarmups, warmup]);
    };

    // Function to clear playlist
    const clearPlaylist = () => {
        setSelectedWarmups([]);
    };
    

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <div>
                            <NavBar />
                            <br/>
                            <br/>
                            <SearchBar query={query} setQuery={setQuery} />
                            <br/>
                            <br/>
                            <br/>
                            <PlaylistCards albumsData={filteredAlbums} />
                            <Footer />
                        </div>
                    }
                />
                <Route path="/createWarmup" element={<CreateWarmupForm />} />
                {/*<Route path="/addWarmup" element={<AddWarmupForm />} />*/}
                <Route 
                    path="/addWarmup" 
                    element={<AddWarmupForm selectedWarmups={selectedWarmups} addWarmup={addWarmupToPlaylist} />} 
                />
                <Route path="/create-playlist" element={<CreatePlaylistForm />} />
                {/*<Route path="/PlaylistDetails" element={<PlaylistDetail />} />*/}
                <Route 
                    path="/PlaylistDetails" 
                    element={<PlaylistDetail selectedWarmups={selectedWarmups} clearPlaylist={clearPlaylist} />} 
                />
            </Routes>
        </Router>
    );
}
  
export default App;