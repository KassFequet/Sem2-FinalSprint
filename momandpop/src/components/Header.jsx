import React from 'react';
import { Link } from 'react-router-dom';
import ovalLogo from '../images/ovallogoborder.png';
import homelogo from '../images/homelogo.png';
import cataloguelogo from '../images/cataloguelogo.png';
import cartlogo from '../images/cartlogo.png';

const Header = () => {
  return (
    <header
      style={{
        padding: '1rem',
        backgroundColor: '#f5f5f5',
        borderBottom: '1px solid #ddd',
      }}
    >
      <nav className="nav-bar">
        <div>
          <img
            src={ovalLogo}
            alt="ovalLogo"
            style={{ height: '100px', marginTop: '10px', marginLeft: '10px' }}
          />
        </div>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <Link
            to="/"
            style={{
              fontSize: '1.9rem',
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: 'black',
              marginRight: '20px',
            }}
          >
            <img
              src={homelogo}
              alt="Home"
              style={{ height: '40px', marginBottom: '4px' }}
            />
            Home
          </Link>
          <Link
            to="/catalogue"
            style={{
              fontSize: '1.9rem',
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: 'black',
              marginRight: '20px',
            }}
          >
            <img
              src={cataloguelogo}
              alt="Catalogue"
              style={{ height: '40px', marginBottom: '4px' }}
            />
            Catalogue
          </Link>
          <Link
            to="/cart"
            style={{
              fontSize: '1.9rem',
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: 'black',
              marginRight: '40px',
            }}
          >
            <img
              src={cartlogo}
              alt="Cart"
              style={{ height: '40px', marginBottom: '4px' }}
            />
            Cart
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
