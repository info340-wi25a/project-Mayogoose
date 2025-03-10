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
import { NavButton } from '../utils/NavButton.jsx';

// import { WarmupItem } from "../utils/WarmupItem.jsx"
import AddWarmupForm from "./AddWarmupForm.jsx"
import PlaylistDetail from "./PlaylistDetail.jsx"
import UserLib from "./UserLib.jsx"
import CreateWarmupForm from "./CreateWarmupForm.jsx"

import { getDatabase, ref, push as firebasePush, onValue } from "firebase/database";

function App() {
    const [query, setQuery] = useState("");
    const [selectedPlaylists, setselectedPlaylists] = useState([]);
    console.log("Selected warmups id: " + selectedPlaylists); // Runa's AddWarmupForm for Routing
    
    useEffect(() => {
        const db = getDatabase();
        const playlistRef = ref(db, 'playlists');

        onValue(playlistRef, (snapshot) => {
            const playlistData = snapshot.val();

            const playlistArray = Object.keys(playlistData).map((key) => ({
                playlistId: key,
                Name: playlistData[key].playlistName,
                Img: playlistData[key].Img,
                alt: playlistData[key].alt,
                goal: playlistData[key].goal,
                genre: playlistData[key].genre,
                visibility: playlistData[key].visibility,
            }));

            if (query === "") {
                setselectedPlaylists(playlistArray);
            }
            else {
                setselectedPlaylists(playlistArray.filter(
                    (playlist) => playlist.Name.toLowerCase().includes(query.toLowerCase())
                ))
            }
        })

    }, [query])


    const FilteredPlaylists = (query, playlists) => {
        if (!query) {
            return playlists;
        }
        return playlists.filter(playlists => playlist.Name.includes(query))
    }    


    // runa: select/remove warmups
    const addWarmupToPlaylist = (warmup) => {
        setselectedPlaylists([...selectedPlaylists, warmup]);
    };

    const removeWarmupFromPlaylist = (warmupId) => {
        setselectedPlaylists(selectedPlaylists.filter(w => w.id !== warmupId));
    };
    
    // Function to clear playlist
    const clearPlaylist = () => {
        setselectedPlaylists([]);
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
                    selectedPlaylists={selectedPlaylists} 
                    addWarmup={addWarmupToPlaylist} 
                    removeWarmup={removeWarmupFromPlaylist}
                />} 
            />
            <Route 
                path="/PlaylistDetails" 
                element={<PlaylistDetail selectedPlaylists={selectedPlaylists} clearPlaylist={clearPlaylist} />} 
            />
            <Route path="/playlist/:playlistId" element={<PlaylistDetail selectedPlaylists={selectedPlaylists} clearPlaylist={clearPlaylist} />} />
            <Route path="*" element={<Navigate to ="/"/>} /> c
        </Routes>
    );
}
  
export default App;