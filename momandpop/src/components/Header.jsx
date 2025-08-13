import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ovalLogo from '../images/ovallogoborder.png';
import homelogo from '../images/homelogo.png';
import cataloguelogo from '../images/cataloguelogo.png';
import cartlogo from '../images/cartlogo.png';
import '../Styles/Header.css';

const Header = () => {
  const [showCatalogueBox, setShowCatalogueBox] = useState(false);

  return (
    <nav className="nav-bar">
      <div>
        <img src={ovalLogo} alt="ovalLogo" className="oval-logo" />
      </div>
      <div className="nav-links-container">
        <Link to="/" className="nav-link">
          <img src={homelogo} alt="Home" className="nav-icon" />
          Home
        </Link>

        <div
          className="catalogue-wrapper"
          onMouseEnter={() => setShowCatalogueBox(true)}
          onMouseLeave={() => setShowCatalogueBox(false)}
        >
          <Link to="/catalogue" className="nav-link">
            <img src={cataloguelogo} alt="Catalogue" className="nav-icon" />
            Catalogue
          </Link>

          <div className={`catalogue-dropdown ${showCatalogueBox ? 'open' : ''}`}>
            <Link to="/catalogue#timber">Timber</Link>
            <Link to="/catalogue#woodtools">Wood Working Tools</Link>
            <Link to="/catalogue#paint">Paint & Stain</Link>
            <Link to="/catalogue#garden">Garden Tools</Link>
            <Link to="/catalogue#seeds">Seeds</Link>
          </div>
        </div>

        <Link to="/cart" className="nav-link">
          <img src={cartlogo} alt="Cart" className="nav-icon" />
          Cart
        </Link>
      </div>
    </nav>
  );
};

export default Header;
