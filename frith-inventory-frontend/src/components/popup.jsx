import React, { useState } from 'react';

const Popup = ({ isOpen, onClose }) => {
  return (
    <div className={`popup ${isOpen ? 'open' : ''}`}>
      <div className="popup-content">
  
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Popup;