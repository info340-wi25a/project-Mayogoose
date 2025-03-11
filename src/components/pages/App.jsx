// Owner: Amelia
// index.html, main.jsx first render this page
import React from 'react';
import { useEffect, useState } from 'react';
import { Routes, Route, data } from 'react-router';
import { NavBar } from '../navigation/NavBar.jsx';
import { Footer } from '../navigation/Footer.jsx';
import { CreatePlaylistForm } from "./CreatePlaylistForm.jsx";
import { Navigate } from 'react-router';
import { PlaylistCards } from '../utils/PlaylistCards.jsx';
import { SearchBar } from '../utils/SearchBar.jsx';
import AddWarmupForm from "./AddWarmupForm.jsx"
import PlaylistDetail from "./PlaylistDetail.jsx"
import UserLib from "./UserProfile.jsx"
import CreateWarmupForm from "./CreateWarmupForm.jsx"

import { getDatabase, ref, push as firebasePush, onValue } from "firebase/database";

function App() {
    const [query, setQuery] = useState("");
    const [selectedPlaylists, setselectedPlaylists] = useState([]); // For playlist
    const [selectedWarmups, setSelectedWarmups] = useState([]); // For warm-ups
    console.log("Selected warmups id: " + selectedWarmups); // Runa's AddWarmupForm for Routing

    useEffect(() => {
        const db = getDatabase();
        const playlistRef = ref(db, 'playlists');
    
        onValue(playlistRef, (snapshot) => {
            const playlistData = snapshot.val();
    
            if (playlistData) {
                const playlistArray = Object.keys(playlistData).map((key) => {
                    let warmups = [];
                    if (playlistData[key].warmups) {
                        warmups = Object.keys(playlistData[key].warmups).map((warmupKey) => ({
                            warmupId: warmupKey,
                            warmupName: playlistData[key].warmups[warmupKey].warmupName,
                        }));
                    }
    
                    return {
                        playlistId: key,
                        Name: playlistData[key].playlistName,
                        Img: playlistData[key].Img,
                        alt: playlistData[key].alt,
                        goal: playlistData[key].goal,
                        genre: playlistData[key].genre,
                        visibility: playlistData[key].visibility,
                        warmups: warmups,
                    };
                });
    
                if (query === "") {
                    setselectedPlaylists(playlistArray);
                } else {
                    setselectedPlaylists(playlistArray.filter(
                        (playlist) =>
                            playlist.Name.toLowerCase().includes(query.toLowerCase())
                            || playlist.goal.toLowerCase().includes(query.toLowerCase())
                            || playlist.genre.toLowerCase().includes(query.toLowerCase())
                            || playlist.warmups.some((warmup) => warmup.warmupName.toLowerCase().includes(query.toLowerCase()))
                    ));
                }
            } else {
                setselectedPlaylists([]);
            }
        });
    }, [query]);
    

    const FilteredPlaylists = (query, playlists) => {
        if (!query) {
            return playlists;
        }
        return playlists.filter(playlists => playlists.Name.includes(query))
    }    


    // runa: select/remove warmups bug
    const addWarmupToPlaylist = (warmup) => {
        setSelectedWarmups([...selectedWarmups, warmup]);
    };

    const removeWarmupFromPlaylist = (warmupId) => {
        setSelectedWarmups(selectedWarmups.filter(w => w.id !== warmupId));
    };
    
    // Function to clear selected warm-ups
    const clearWarmups = () => {
        setSelectedWarmups([]);
    };


    // unauthorized users can view warmups from homepage
    // but if they wanna create new warmup/playlists, render firebase's auth pop-ups
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <div>
                        <NavBar />
                        <br/>
                        <br/>
                        <h1>Vocal Warmup Made Easy</h1>
                        <br/>
                        <br/>
                        <SearchBar setQuery={setQuery} />
                        <br/>
                        <PlaylistCards albumsData={selectedPlaylists} />
                        <Footer />
                    </div>
                }
            />
            <Route path="/createWarmup" element={<CreateWarmupForm />} />
            <Route path="/createPlaylist" element={<CreatePlaylistForm />} />
            <Route path="/profile" element={<UserLib />} />
            <Route 
                path="/addWarmup" 
                element={<AddWarmupForm 
                    selectedWarmups={selectedWarmups} 
                    addWarmup={addWarmupToPlaylist} 
                    removeWarmup={removeWarmupFromPlaylist}
                />} 
            />
            <Route 
                path="/PlaylistDetails" 
                element={<PlaylistDetail 
                    selectedWarmups={selectedWarmups} 
                    clearWarmups={clearWarmups} 
                    //removeWarmup={removeWarmupFromPlaylist} 
                />} 
            />
            <Route path="/playlist/:playlistId" 
            element={<PlaylistDetail 
            selectedWarmups={selectedWarmups} 
            clearWarmups={clearWarmups} 
            // removeWarmup={removeWarmupFromPlaylist} 
            />} />
            <Route path="*" element={<Navigate to ="/"/>} /> 
        </Routes>
    );
}
  
export default App;