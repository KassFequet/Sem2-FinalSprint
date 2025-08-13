import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Chevron from "../images/chevron.png";

import "../Styles/Contact.css";
import "../Styles/Questions.css";

function Contact() {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="contact-box">
      <div className="contact-header">
        <h3>
          Questions answered by Mom and Pop!
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

      <div className="question-box">
        <h3>What’s your return policy?</h3>
        <p>"Returns are accepted within 30 days with receipt. If you’re not happy, we’ll make it right."</p>
        <h3>Can I call ahead to hold an item?</h3>
        <p>"Absolutely — we’ll set it aside for 24 hours."</p>
        <h3>Do you offer delivery or shipping?</h3>
        <p>“We currently don’t offer shipping or delivery services. But you're always welcome to shop online and pick up your order in-store. If you have special circumstances, feel free to give us a call — we’re happy to help however we can!”</p>
        <h3>Can you recommend someone for installation or repairs?</h3>
        <p>"We partner with trusted local professionals and tradespeople. Just ask us!"</p>
      </div>
    </div>
  );
}

export default Contact;
