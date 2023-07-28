// BurgerMenu.js
import React from 'react';
import './BurgerMenu.css';

const BurgerMenu = ({ isOpen, onClick }) => {
  return (
    <div className={`burger-menu ${isOpen ? 'open' : ''}`} onClick={onClick}>
      <span></span>
      <span></span>
      <span></span>
      {/* Dropdown content */}
      {isOpen && (
        <div className="dropdown-content">
        </div>
      )}
    </div>
  );
};

export default BurgerMenu;
