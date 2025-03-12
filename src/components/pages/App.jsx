// Owner: Amelia
// index.html, main.jsx first render this page
import React from 'react';
import { useEffect, useState } from 'react';
import { Routes, Route, data } from 'react-router';
import { NavBar } from '../navigation/NavBar.jsx';
import { Footer } from '../navigation/Footer.jsx';
import { Navigate } from 'react-router';
import { PlaylistCards } from '../utils/PlaylistCards.jsx';
import { SearchBar } from '../utils/SearchBar.jsx';
import AddWarmupForm from "./AddWarmupForm.jsx"
import PlaylistDetail from "./PlaylistDetail.jsx"
import UserProfile from "./UserProfile.jsx"
import CreateWarmupForm from "./CreateWarmupForm.jsx"
import { CreatePlaylistForm } from "./CreatePlaylistForm.jsx";
// for firebase auth
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { getAuth, EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
// for firebase real-time database
import { getDatabase, ref, push as firebasePush, onValue } from "firebase/database";

function App() {
    const [query, setQuery] = useState("");
    const [playlistArr, setPlaylistArr] = useState([]); // For retrieve playlist from firebase
    const [searchedPlaylists, setSearchedPlaylists] = useState([]); // For playlist
    const [selectedWarmups, setSelectedWarmups] = useState([]); // For warm-ups
    const [userObj, setUserObj] = useState(null); // For logic 
    const auth = getAuth(); // only authenticated user can navigate to CreateWarmupForm, CreatePlaylistForm, & UserProfile
    console.log("Selected warmups id: " + selectedWarmups); // Runa's AddWarmupForm for Routing


    useEffect(() => {
        const db = getDatabase();
        const playlistRef = ref(db, 'playlists');

        onAuthStateChanged(auth, (firebaseUser) => {
            console.log("login status changed")
            console.log(firebaseUser)

            if(firebaseUser) {
                setUserObj(firebaseUser); // retrieve User UID
            }
        })
    
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
                
                setPlaylistArr(playlistArray);
    
                if (query === "") {
                    setSearchedPlaylists(playlistArray);
                } else {
                    setSearchedPlaylists(playlistArray.filter(
                        (playlist) =>
                            playlist.Name.toLowerCase().includes(query.toLowerCase())
                            || playlist.goal.toLowerCase().includes(query.toLowerCase())
                            || playlist.genre.toLowerCase().includes(query.toLowerCase())
                            || playlist.warmups.some((warmup) => warmup.warmupName.toLowerCase().includes(query.toLowerCase()))
                    ));
                }
            } else {
                setSearchedPlaylists([]);
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

    // meiyao: auth UI
    //object of configuration values for firebase auth
    const firebaseUIConfig = {
        signInOptions: [ 
            GoogleAuthProvider.PROVIDER_ID,
        { provider: EmailAuthProvider.PROVIDER_ID, requiredDisplayName: true }, ],
        signInFlow: 'popup', //don't redirect to authenticate
        credentialHelper: 'none', //don't show the email account chooser
        callbacks: {
            signInSuccessWithAuthResult: () => {
                return false; //don't redirect after authentication
            }
        }
    }


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
                        <PlaylistCards albumsData={searchedPlaylists} />
                        <Footer />
                    </div>
                }
            />
            <Route path="/createWarmup" element={<CreateWarmupForm />} />
            <Route path="/createPlaylist" element={<CreatePlaylistForm />} />
            <Route 
                path="/profile" 
                element={
                    <UserProfile 
                        currUser={userObj}
                        allPlaylists={playlistArr}
                    />
                } 
            />
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
                    removeWarmup={removeWarmupFromPlaylist} 
                />} 
            />
            <Route path="/playlist/:playlistId" 
            element={<PlaylistDetail 
            selectedWarmups={selectedWarmups} 
            clearWarmups={clearWarmups} 
            removeWarmup={removeWarmupFromPlaylist} 
            />} />
            <Route path="*" element={<Navigate to ="/"/>} /> 
        </Routes>
    );
}
  
export default App;