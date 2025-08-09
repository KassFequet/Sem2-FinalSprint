import React, { useState } from 'react';

const LengthButton = ({ basePrice, onPriceChange }) => {
  const [selectedLength, setSelectedLength] = useState('6');

  const handleLengthChange = (length) => {
    setSelectedLength(length);
    const newPrice = length === '12' ? basePrice + 3.5 : basePrice;
    onPriceChange(newPrice);
  };

  return (
    <div className="length-options">
      <p className="option-pick">
        Pick your Option
        <br />
        &nbsp;&nbsp;&nbsp;(Length in ft.)
      </p>
      <div className="timber-options">
        <button
          className={`timber-btn ${selectedLength === '6' ? 'active' : ''}`}
          onClick={() => handleLengthChange('6')}
        >
          6'
        </button>
        <button
          className={`timber-btn ${selectedLength === '12' ? 'active' : ''}`}
          onClick={() => handleLengthChange('12')}
        >
          12'
        </button>
      </div>
    </div>
  );
};

export default LengthButton;
