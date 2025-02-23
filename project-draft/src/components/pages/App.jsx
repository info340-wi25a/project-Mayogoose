// Amelia's index.html, main.jsx first render this page
import React from 'react';
import { useState } from 'react';

// // Import other pages
// import { upload } from "./Upload.jsx"; // meiyao: upload individual warmup
// import { NewPlaylist } from "./NewPlaylist.jsx"; // ellie: upload playlist

// // Import Components (1, 2, 3, 4, 8, 9)
// import { NavBar } from "./navigation/NavBar.jsx";

import { Button } from "../utils/NavButton.jsx";
import { PlaylistCards } from '../utils/PlaylistCards.jsx';
import { SearchBar } from '../utils/SearchBar.jsx';

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
        <div>
            <div>
                <p>button test:</p>
                <Button text="A button" />
            </div>
            <br></br>
            <div>
                <p>homepage content:</p>
                <SearchBar setQuery={setQuery}/>
                <br></br>
                <br></br>
                <br></br>
                <PlaylistCards albumsData={filteredAlbums}/>
            </div>
        </div>
    );
}
  
export default App;