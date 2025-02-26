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


function AddWarmupForm({ selectedWarmups, addWarmup }) {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const warmupsList = warmupData.map(warmup => ({
      id: warmup.Id, 
      name: warmup.Name,
      image: warmup.Img
  })); 

  const handleAddWarmup = (warmup) => {
    // Check if the warmup is already selected
    let isAlreadySelected = false;
    for (let i = 0; i < selectedWarmups.length; i++) {
      if (selectedWarmups[i].id === warmup.id) {
        isAlreadySelected = true;
        break;
      }
    }
    
    if (!isAlreadySelected) {
      addWarmup(warmup);
    }
  };
  
  return (
      <div className="add-warmup-container">
          <NavBar />
        
      <div className="main-content">
        <div className="search-select-container">
          <SearchBar query={searchQuery} setQuery={setSearchQuery} />
        </div>

        <h1>Suggested Warm-ups</h1>
              <div className="warmups-list">
                  {warmupsList.map((warmup) => (
                      <WarmupItem
                          key={warmup.id}
                          warmup={warmup}
                          onAdd={() => handleAddWarmup(warmup)}
                      />
                  ))}
              </div>

              <div className="line-container">
                  <div className="line"></div>
                  <p>Selected Warm-ups ({selectedWarmups.length})</p>
                  <div className="line"></div>
              </div>

              <div className="selected-warmups">
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
                destination="/PlaylistDetails" 
                state={{ selectedWarmups }} 
              />
            <Footer />
      </div>
    </div>
  );
};

export default AddWarmupForm;
