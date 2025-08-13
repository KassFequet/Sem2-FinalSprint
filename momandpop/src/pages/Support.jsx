import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Chevron from "../images/chevron.png";
import "../Styles/Contact.css";

function Contact() {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="contact-box">
      <div className="contact-header">
        <h3>
          Support from Mom and Pop!
          <span
            className="chevron-wrapper"
            onMouseEnter={() => setIsActive(true)}
            onMouseLeave={() => setIsActive(false)}
          >
            <img id="chevron" src={Chevron} alt="Contact menu" />
            <div className={`contact-dropdown ${isActive ? "active" : ""}`}>
            <Link to="/Contact">Contact Us!</Link>
            <Link to="/Support">Support</Link>
            <Link to="/Questions">Questions answered by Mom & Pop!</Link>
            </div>
          </span>
        </h3>
        <hr />
      </div>

      <div className="phone-num-box">
        <p>
          "We're here to help! As your neighborhood hardware store, we're committed to providing honest advice, quality products, and friendly service. If you need help with your order, your tools, or your next big project — just reach out!"
        </p>
        <p>
          Email: support@Mom'sGardenPop'sWorkshop.com
        </p>
        <p>
          In-Store Help: Visit us at 123 Maple Street, Mon-Sat, 9am-5pm
        </p>
          
      </div>
    </div>
  );
}

export default Contact;
