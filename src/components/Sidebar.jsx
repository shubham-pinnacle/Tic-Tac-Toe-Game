import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div style={{ width: '200px', backgroundColor: '#f4f4f4', padding: '10px' }}>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/crud">CRUD</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;