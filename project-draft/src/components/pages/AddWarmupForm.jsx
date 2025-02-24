// 3
// Runa's addSongs.html from draft 1
// functionalities:
    // search for warmups (use #2 searchbar)
    // add individual warmups (use #7 warmup)
    // "create" link to the next page "myPlaylist.jsx" (use #6 button)

// Import Components (1, 2, 3, 9)

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { NavBar } from "../utils/NavBar.jsx"; // Error happens here 到时候记得修改
import { NavButton } from "../utils/NavButton.jsx"; // Component 1
import { WarmupItem } from "../utils/WarmupItem.jsx"; // Component 9
import { SearchBar } from "../utils/SearchBar.jsx"; // Component 2
import { CreateButton } from "../utils/CreateButton.jsx"; // Component 3
import warmupData from '../../data/playlist.json'; // Add warmup data


const AddWarmupForm = () => {
    // State to store selected warmups and search query
    const [selectedWarmups, setSelectedWarmups] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
  
    const warmupsList = warmupData.warmups;
  
    // // Handle search input changes
    // const handleSearch = (query) => {
    //   setSearchQuery(query);
    //   // Add search logic here
    // };
  
    // Prevent duplicate warmups
    const handleAddWarmup = (warmup) => {
      if (!selectedWarmups.some(selected => selected.id === warmup.id)) {
          setSelectedWarmups([...selectedWarmups, warmup]);
      }
  };

  
    return (
      <div className="add-warmup-container">
        <NavBar />
        
        <div className="main-content">
          <h1>Add Warmups</h1>
          
          <SearchBar query={searchQuery} setQuery={setSearchQuery} />
  
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
          
          {/* 到时候可以用meiyao的create button component */}
          <CreateButton 
            text="Create"
            onClick={() => navigate('/myPlaylist')}
          />

          <NavButton text="Back to Home" destination="/" />
        </div>
      </div>
    );
  };
  
  export default AddWarmupForm;





  