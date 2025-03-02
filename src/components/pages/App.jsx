// Owner: Amelia
// index.html, main.jsx first render this page
import React from 'react';
import { useState } from 'react';
import { Routes, Route } from 'react-router';
import { NavBar } from '../navigation/NavBar.jsx';
import { Footer } from '../navigation/Footer.jsx';
import { CreatePlaylistForm } from "./CreatePlaylistForm.jsx";
import { Navigate } from 'react-router';
import { PlaylistCards } from '../utils/PlaylistCards.jsx';
import { SearchBar } from '../utils/SearchBar.jsx';
import { NavButton } from '../utils/NavButton.jsx';

// import { WarmupItem } from "../utils/WarmupItem.jsx"
import AddWarmupForm from "./AddWarmupForm.jsx"
import PlaylistDetail from "./PlaylistDetail.jsx"
import UserLib from "./UserLib.jsx"

import CreateWarmupForm from "./CreateWarmupForm.jsx"
import albumsData from '../../data/playlist.json'


function App() {
    const [query, setQuery] = useState("");
    const [selectedWarmups, setSelectedWarmups] = useState([]);
    console.log("Selected warmups id: " + selectedWarmups)

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
            <Route path="/createPlaylist" element={<CreatePlaylistForm />} />
            <Route path="/profile" element={<UserLib />} />
            <Route 
                path="/addWarmup" 
                element={<AddWarmupForm selectedWarmups={selectedWarmups} addWarmup={addWarmupToPlaylist} />} 
            />
            <Route 
                path="/PlaylistDetails" 
                element={<PlaylistDetail selectedWarmups={selectedWarmups} clearPlaylist={clearPlaylist} />} 
            />
            <Route path="/playlist/:playlistId" element={<PlaylistDetail selectedWarmups={selectedWarmups} clearPlaylist={clearPlaylist} />} />
            <Route path="*" element={<Navigate to ="/"/>} /> c
        </Routes>
    );
}
  
export default App;