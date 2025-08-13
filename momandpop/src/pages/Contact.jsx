import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Chevron from "../images/chevron.png";
import "../Styles/Contact.css";

function Contact() {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="contact-box">
      <div className="contact-header">
        <h3          onMouseEnter={() => setIsActive(true)}
          onMouseLeave={() => setIsActive(false)}>
          Contact Mom & Pop!

          <span
            className="chevron-wrapper"
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

      <div className="contact-quote">
        <p>
          "Not sure how to get started? Give us a call - we love talking shop!" - Mom & Pop
        </p>
      </div>

      <div className="phone-num-box">
        <p>
          Mom(Gardening Section): <span className="phone-num">(709) 555-5555</span>
        </p>
        <p>
          Pop(Workshop): <span className="phone-num">(709) 555-5555</span>
        </p>
        <br/>
        <br/>
        <p>
          General Inquiries: <span className="phone-num">(709) 635-9247</span>
        </p>
      </div>
    </div>
  );
}

export default Contact;
