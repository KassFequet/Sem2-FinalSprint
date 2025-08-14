import React from 'react';
import { Link } from 'react-router-dom';
import Contact from '../pages/Contact';
import '../Styles/Footer.css';
import badge from '../images/logocircle.png';


const Footer = () => {
  return (
    <footer className="footer">
        <div className="footer-container">
            <div className="footer-left">
                <div className="footer-hero">Subscribe to Mom's Garden and Pop's Workshop Newsletter</div>
                <div className="newsletter">
                    <input type="text" placeholder='First Name' />
                    <input type="text" placeholder='Last Name' />
                    <input type="email" placeholder='Email Address' />
                    <button className="subscribe-button">Subscribe</button>
                </div>
            </div>
            <div className="footer-right">
                <div className="links-container"> 
                    <div className="footer-links">
                        <Link to="/Contact" className="footer-link">Contact Us</Link>
                        <Link to="/#map" className="footer-link">Store Location</Link>
                        <Link to="/products" className="footer-link">Product Page</Link>
                        <Link to="/Questions" className="footer-link">Questions Answered</Link>
                        <Link to="/#reviews" className="footer-link">Reviews</Link>
                        <Link to="/Support" className="footer-link">Support</Link>
                        <Link to="/Questions" className="footer-link">Return Policy</Link>
                    </div>
                </div>
            </div>
        </div>
        <hr/>
        <div className="footer-bottom">
            <p>© 2025 Mom's Garden and Pop's Workshop. All rights reserved.</p>
            <img src={badge} alt="Mom's Garden and Pop's Workshop Logo" className="footer-logo" />


        </div>
    </footer>
  )
};

export default Footer;
