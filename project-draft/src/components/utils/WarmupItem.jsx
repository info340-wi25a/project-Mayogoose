// #7 individual warmups
// owner: runa

import React from 'react';

export function WarmupItem({ warmup, onAdd, isSelected }) {
  const name = warmup.Name || warmup.name;
  const image = warmup.Img || warmup.image;
  const voiceType = warmup["Voice Type"] || warmup.voiceType || "";

  return (
    <div className="warmup">
      {/* Warm-up Image */}
      <img src={image} alt={name} className="warmup-img" />

      {/* Warm-up Info */}
      <div className="warmup-info">
        <p className="title">{name}</p>
        <p className="category">{voiceType}</p>
      </div>

      {/* Add Button */}
      <button className="add-warmup-btn" onClick={() => onAdd(warmup)}>+</button>
    </div>
  );
}

