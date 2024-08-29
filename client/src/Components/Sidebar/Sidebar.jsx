// src/Sidebar.js
import React from 'react';
import HealthAdvice from './HealthAdvice';

const Sidebar = () => {
  return (
    <div className="sidebar bg-white shadow-md h-screen p-4" style={{ width: '300px' }}>
      <HealthAdvice />
    </div>
  );
};

export default Sidebar;
