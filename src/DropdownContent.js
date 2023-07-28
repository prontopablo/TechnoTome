// DropdownContent.js
import React from 'react';
import BurgerMenu from './BurgerMenu';
import './DropdownContent.css';

const DropdownContent = ({ isOpen, onCloseDropdown }) => {
  return (
    <div className={`dropdown-overlay ${isOpen ? 'open' : ''}`}>
      {/* Burger menu */}
      <BurgerMenu isOpen={isOpen} onClick={onCloseDropdown} />
      
      {/* Dropdown content */}
      <div className="dropdown-menu">
        <a href="#products">Products</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </div>
    </div>
  );
};

export default DropdownContent;