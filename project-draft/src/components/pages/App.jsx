// Amelia's index.html, main.jsx first render this page
import React from 'react';
import { useState } from 'react';
import { NavBar } from '../navigation/NavBar.jsx';
import { Footer } from '../navigation/footer.jsx';

import albumsData from '../../data/playlist.json'; // import playlist data

// Import other pages
// import { upload } from "./Upload.jsx"; // meiyao: upload individual warmup
// import { NewPlaylist } from "./NewPlaylist.jsx"; // ellie: upload playlist

import { NavButton } from "../utils/NavButton.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import { PlaylistCards } from '../utils/PlaylistCards.jsx';
import { SearchBar } from '../utils/SearchBar.jsx';
import { VisibilityBar } from '../utils/VisibilityBar.jsx';

// Runa's warmup form
// import { WarmupItem } from "../utils/WarmupItem.jsx"
import AddWarmupForm from "./AddWarmupForm.jsx"

import CreateWarmupForm from "./CreateWarmupForm.jsx"
import { CreatePlayListForm } from "./CreatePlaylistForm.jsx"
<<<<<<< HEAD
=======
import albumsData from '../../data/playlist.json'

>>>>>>> 756c4689bef037e624f01d242374f6836f9ebe27



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
            </Routes>
        </Router>
    );
}
  
export default App;