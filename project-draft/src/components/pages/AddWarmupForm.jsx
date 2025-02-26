// 3
// Runa's addSongs.html from draft 1
// functionalities:
    // search for warmups (use #2 searchbar)
    // add individual warmups (use #7 warmup)
    // "create" link to the next page "myPlaylist.jsx" (use #6 button)

// Import Components (1, 2, 3, 9)

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavBar } from "../navigation/NavBar.jsx"; // NavBar
import { Footer } from "../navigation/Footer.jsx"; // Footer
import { NavButton } from "../utils/NavButton.jsx"; // Component 1
import { WarmupItem } from "../utils/WarmupItem.jsx"; // Component 9
import { SearchBar } from "../utils/SearchBar.jsx"; // Component 2
import { SelectButton } from "../utils/SelectButton.jsx"; // Component 3
import warmupData from '../../data/warmup.json'; // Add warmup data
// import platlistData from '../../data/playlist.json'; // Add playlist data


function AddWarmupForm() {
    // State to store selected warmups and search query
    const [selectedWarmups, setSelectedWarmups] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const warmupsList = warmupData.map(warmup => ({
      id: warmup.Id, 
      name: warmup.Name,
      image: warmup.Img
  }));
    
  
    const handleAddWarmup = (warmup) => {
      setSelectedWarmups([...selectedWarmups, warmup]); 
    };

    const handleCreatePlaylist = () => {
      // Navigate to the playlistdetails page 
      navigate('/PlaylistDetails.jsx', { state: { selectedWarmups } });
  };


  
    return (
      <div className="add-warmup-container">
        <NavBar />
        
        <div className="main-content">
          <div className="search-select-container">
            <SearchBar query={searchQuery} setQuery={setSearchQuery} />
            <SelectButton text="Upload your own warm-ups" destination="/createWarmup"/>  
          </div>

          <h1>Suggested Warm-ups</h1>
                <div className="warmups-list">
                    {warmupsList.map((warmup) => (
                        <WarmupItem
                            key={warmup.id}
                            warmup={warmup}
                            onAdd={handleAddWarmup}
                        />
                    ))}
                </div>

                {/* 选中的 warmups */}
                <div className="selected-warmups">
                    <h2>Selected Warmups ({selectedWarmups.length})</h2>
                    {selectedWarmups.map((warmup) => (
                        <WarmupItem
                            key={warmup.id}
                            warmup={warmup}
                            isSelected={true}
                        />
                    ))}
                </div>
          
          <NavButton 
            text="Create!" 
            onClick={handleCreatePlaylist}
          />

          <Footer />
        </div>
      </div>
    );
  };
  
  export default AddWarmupForm;
