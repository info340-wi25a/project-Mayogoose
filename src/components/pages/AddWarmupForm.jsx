// Owner: Runa
// functionalities:
    // search for warmups
    // add individual warmups to the new playlist
    import React, { useState } from 'react';
    import { useNavigate, useLocation } from 'react-router-dom';
    import { NavBar } from "../navigation/NavBar.jsx"; // NavBar
    import { Footer } from "../navigation/Footer.jsx"; // Footer
    import { NavButton } from "../utils/NavButton.jsx"; // Component 1
    import { AddWarmupItem } from "../utils/AddWarmupItem.jsx"; // Component 9
    import { SearchBar } from "../utils/SearchBar.jsx"; // Component 2
    // import { SelectButton } from "../utils/SelectButton.jsx"; // Component 3 didn't use it
    // import warmupData from '../../data/warmup.json'; // hard-coded warmup data (not used)
    function AddWarmupForm({ warmupData, selectedWarmups = [], addWarmup, removeWarmup }) {
      const navigate = useNavigate(); 
    
      const warmupsList = warmupData.map(warmup => ({
          id: warmup.warmupId, 
          name: warmup.warmupName,
          image: warmup.img
      })); 
    
      const isWarmupSelected = (warmupId) => {
          return selectedWarmups.some(w => w.id === warmupId);
      };
    
      const handleToggleWarmup = (warmup) => {
          if (isWarmupSelected(warmup.id)) {
              removeWarmup(warmup.id);
          } else {
              addWarmup(warmup);
          }
      };
    
      let selectedWarmupItems;
      if (selectedWarmups.length > 0) {
          selectedWarmupItems = selectedWarmups.map(warmup => (
              <AddWarmupItem
                  key={warmup.id}
                  warmup={warmup}
                  onAdd={() => handleToggleWarmup(warmup)}
                  onRemove={removeWarmup}
                  isSelected={true}
              />
          ));
      } else {
          selectedWarmupItems = <p>No warm-ups selected.</p>;
      }
    
      const suggestedWarmupItems = warmupsList.map((warmup) => (
          <AddWarmupItem
              key={warmup.id}
              warmup={warmup}
              onAdd={() => handleToggleWarmup(warmup)}
              onRemove={removeWarmup}
              isSelected={isWarmupSelected(warmup.id)}
          />
      ));
    
      return (
          <div className="add-warmup-container">
              <NavBar />
              <div className="main-content">
                  <h1>Add Warm-ups</h1> 
                  
                  <div className="search-select-container">
                      <SearchBar />
                  </div>
                  
                  <div className="warmups-container">
                      {/* Selected Warm-ups Section */}
                      <div className="warmups-column">
                          <h2>Selected Warm-ups ({selectedWarmups.length})</h2>
                          <div className="warmups-list">{selectedWarmupItems}</div>
                      </div>
                      
                      {/* Suggested Warm-ups Section */}
                      <div className="warmups-column">
                          <h2>Suggested Warm-ups ({warmupData.length})</h2>
                          <div className="warmups-list">{suggestedWarmupItems}</div>
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
    }
    
  export default AddWarmupForm;