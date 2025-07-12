import React from 'react';
import { Link } from 'react-router-dom';

export const SimpleNavigation: React.FC = () => {
  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      right: 0, 
      zIndex: 9999, 
      backgroundColor: '#dc2626', 
      color: 'white', 
      height: '64px', 
      display: 'flex', 
      alignItems: 'center',
      padding: '0 16px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <div>
          <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '24px', fontWeight: 'bold' }}>
            MakhoolDesigns
          </Link>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none', padding: '8px 12px' }}>Home</Link>
          <Link to="/about" style={{ color: 'white', textDecoration: 'none', padding: '8px 12px' }}>About</Link>
          <Link to="/projects" style={{ color: 'white', textDecoration: 'none', padding: '8px 12px' }}>Projects</Link>
          <Link to="/reviews" style={{ color: 'white', textDecoration: 'none', padding: '8px 12px' }}>Reviews</Link>
          <Link to="/contact" style={{ color: 'white', textDecoration: 'none', padding: '8px 12px' }}>Contact</Link>
          <Link to="/login" style={{ backgroundColor: 'white', color: '#dc2626', textDecoration: 'none', padding: '8px 16px', borderRadius: '4px' }}>Login</Link>
          <Link to="/admin" style={{ backgroundColor: '#991b1b', color: 'white', textDecoration: 'none', padding: '8px 16px', borderRadius: '4px' }}>Admin</Link>
        </div>
      </div>
    </div>
  );
};

export default SimpleNavigation;
