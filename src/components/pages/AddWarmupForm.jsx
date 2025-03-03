// Owner: Runa
// functionalities:
    // search for warmups
    // add individual warmups to the new playlist
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavBar } from "../navigation/NavBar.jsx"; // NavBar
import { Footer } from "../navigation/Footer.jsx"; // Footer
import { NavButton } from "../utils/NavButton.jsx"; // Component 1
import { AddWarmupItem } from "../utils/AddWarmupItem.jsx"; // Component 9
import { SearchBar } from "../utils/SearchBar.jsx"; // Component 2
import { SelectButton } from "../utils/SelectButton.jsx"; // Component 3
import warmupData from '../../data/warmup.json'; // Add warmup data

function AddWarmupForm({ selectedWarmups, addWarmup, removeWarmup }) {
  //const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const warmupsList = warmupData.map(warmup => ({
      id: warmup.warmupId, 
      name: warmup.warmupName,
      image: warmup.img
  })); 

  const handleToggleWarmup = (warmup) => {
    let isSelected = false;
    for (let i = 0; i < selectedWarmups.length; i++) {
      if (selectedWarmups[i].id === warmup.id) {
        isSelected = true;
        break;
      }
    }
    
    if (isSelected) {
      removeWarmup(warmup.id); 
    } else {
      addWarmup(warmup); 
    }
  };

  return (
    <div className="add-warmup-container">
      <NavBar />
      <div className="main-content">
        <div className="search-select-container">
          <SearchBar />
        </div>
        
        <div className="warmups-container">
          <div className="warmups-column">
            <h2>Selected Warm-ups ({selectedWarmups.length})</h2>
            <div className="warmups-list">
              {selectedWarmups.length > 0 && (
                selectedWarmups.map(function(warmup) {
                  return (
                    <AddWarmupItem
                      key={warmup.id}
                      warmup={warmup}
                      onAdd={function() { handleToggleWarmup(warmup); }}
                      isSelected={true}
                    />
                  );
                })
              )}
              {selectedWarmups.length === 0 && (
                <p>No warm-ups selected.</p>
              )}
            </div>
          </div>
          
          <div className="warmups-column">
            <h2>Suggested Warm-ups ({warmupData.length})</h2>
            <div className="warmups-list">
              {warmupsList.map(function(warmup) {
                let found = false;
                for (let i = 0; i < selectedWarmups.length; i++) {
                  if (selectedWarmups[i].id === warmup.id) {
                    found = true;
                    break;
                  }
                }
                return (
                  <AddWarmupItem
                    key={warmup.id}
                    warmup={warmup}
                    onAdd={function() { handleToggleWarmup(warmup); }}
                    isSelected={found}
                  />
                );
              })}
            </div>
          </div>
        </div>

        <div className="create-button-container">
          <NavButton 
            text="Create!" 
            destination="/PlaylistDetails" 
            state={{ selectedWarmups }} 
          />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AddWarmupForm;
