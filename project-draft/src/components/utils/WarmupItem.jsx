// #7 individual warmups
// owner: runa

import React from 'react';

export function WarmupItem({ title, category, image, onAdd }) {
  return (
    <div className="warmup">
      {/* Warm-up Image */}
      <img src={image} alt={title} className="warmup-img" />

      {/* Warm-up Info */}
      <div className="warmup-info">
        <p className="title">{title}</p>
        <p className="category">{category}</p>
      </div>

      {/* Add Button */}
      <button className="add-warmup-btn" onClick={onAdd}>+</button>
    </div>
  );
}


