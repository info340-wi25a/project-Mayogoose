// #7 individual warmups
// owner: runa

import React from 'react';

const WarmupItem = ({ title, description }) => {
  return (
    <div className="warmup-item">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default WarmupItem;

