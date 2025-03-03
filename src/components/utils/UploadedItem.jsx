// #7 individual warmups
// owner: runa

import React from 'react';

export function UploadedItem({ warmup, onAdd, isSelected }) {
  const name = warmup.Name || warmup.name;
  const image = warmup.Img || warmup.image;
  const voiceType = warmup["Voice Type"] || warmup.voiceType || "";
  
  return (
    <div className="warmup">
      <img src={image} alt={name} className="warmup-img" />
      <div className="warmup-info">
        <p className="title">{name}</p>
        <p className="category">{voiceType}</p>
      </div>
    </div>
  );
}

