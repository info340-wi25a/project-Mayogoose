// #7 individual warmups
// owner: runa

import React from 'react';

export function AddWarmupItem({ warmup, onAdd, isSelected, onRemove}) {
  const name = warmup.warmupName || "";
  const image = warmup.img || "";
  const voiceType = warmup.voiceType|| "";
  
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
      <img src={image} alt={`Warmup's image: ${name}`} className="warmup-img" />
      <div className="warmup-info">
        <p className="title">{name}</p>
        <p className="category">{voiceType}</p>
      </div>
      <button 
        className={buttonClass} 
        onClick={() => {
          if (isSelected) {
            onRemove(warmup.id); 
          } else {
            onAdd(warmup);
          }
        }}>
        {buttonText}
      </button>
    </div>
  );
}