// 3
// Runa's addSongs.html from draft 1
// functionalities:
    // search for warmups (use #2 searchbar)
    // add individual warmups (use #7 warmup)
    // "create" link to the next page "myPlaylist.jsx" (use #6 button)

// Import Components (1, 2, 3, 9)

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavButton } from "../utils/NavButton.jsx"; // Component 1
import { WarmupItem } from "../utils/WarmupItem.jsx"; // Component 9
import { SearchBar } from "../utils/SearchBar.jsx"; // Component 2
import { CreateButton } from "../utils/CreateButton.jsx"; // Component 3
import warmupData from '../../data/data.json'; // Add warmup data


const AddWarmupForm = () => {
    // State to store selected warmups and search query
    const [selectedWarmups, setSelectedWarmups] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
  
    // Use warmupData from data.json instead of mock data
    const warmupsList = warmupData.warmups;
  
    // // Handle search input changes
    // const handleSearch = (query) => {
    //   setSearchQuery(query);
    //   // Add search logic here
    // };
  
    // // Handle adding warmup to selection
    const handleAddWarmup = (warmup) => {
      setSelectedWarmups([...selectedWarmups, warmup]);
    };
  
    return (
      <div className="add-warmup-container">
        <NavBar />
        
        <div className="main-content">
          <h1>Add Warmups</h1>
          
          <SearchBar 
            query={searchQuery}
            setQuery={setSearchQuery}
          />
  
          <div className="warmups-list">
            {warmupsList.map((warmup) => (
              <WarmupItem
                key={warmup.id}
                warmup={warmup}
                onAdd={() => handleAddWarmup(warmup)}
              />
            ))}
          </div>
  
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
  
          <CreateButton 
            text="Create Playlist"
            onClick={() => navigate('/myPlaylist')}
          />
        </div>
      </div>
    );
  };
  
  export default AddWarmupForm;





  