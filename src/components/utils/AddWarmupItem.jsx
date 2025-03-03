// #7 individual warmups
// owner: runa

import React from 'react';

export function AddWarmupItem({ warmup, onAdd, isSelected }) {
  const name = warmup.Name || warmup.name;
  const image = warmup.Img || warmup.image;
  const voiceType = warmup["Voice Type"] || warmup.voiceType || "";
  
  let buttonClass = "add-warmup-btn";
  if (isSelected) {
    buttonClass += " remove"; 
  } else {
    buttonClass += " add"; 
  }

  let buttonText;
  if (isSelected) {
    buttonText = "−"; 
  } else {
    buttonText = "+"; 
  }

  return (
    <div className="warmup">
      <img src={image} alt={name} className="warmup-img" />
      <div className="warmup-info">
        <p className="title">{name}</p>
        <p className="category">{voiceType}</p>
      </div>
      <button 
        className={buttonClass} 
        onClick={function() { onAdd(warmup); }}>
      {buttonText}
      </button>
    </div>
  );
}

