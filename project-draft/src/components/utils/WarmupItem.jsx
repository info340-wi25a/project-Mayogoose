// #7 individual warmups
// owner: runa

import React from 'react';

export function WarmupItem({ warmup, onAdd }) {
  return (
    <div className="warmup">
      {/* Warm-up Image */}
      <img src={warmup.image} alt={warmup.title} className="warmup-img" />

      {/* Warm-up Info */}
      <div className="warmup-info">
        <p className="title">{warmup.title}</p>
        <p className="category">{warmup.category}</p>
      </div>

      {/* Add Button */}
      <button className="add-warmup-btn" onClick={() => onAdd(warmup)}>+</button>
    </div>
  );
}

