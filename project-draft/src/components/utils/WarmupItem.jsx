// #7 individual warmups
// owner: runa

import React from 'react';

export function WarmupItem({ warmup, onAdd }) {
  return (
    <div className="warmup">
      {/* Warm-up Image */}
      <img src={warmup.Img} alt={warmup.Name} className="warmup-img" />

      {/* Warm-up Info */}
      <div className="warmup-info">
        <p className="title">{warmup.Name}</p>
        <p className="category">{warmup["Voice Type"]}</p>
      </div>

      {/* Add Button */}
      <button className="add-warmup-btn" onClick={() => onAdd(warmup)}>+</button>
    </div>
  );
}

