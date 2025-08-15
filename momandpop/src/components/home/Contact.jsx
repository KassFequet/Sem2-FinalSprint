import React from 'react'

const Contact = () => {
  return (
    <section className="contactContainer">
      <section className="mapContainer">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d673.2092655904673!2d-52.71784544375607!3d47.55149986343339!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4b0ca3a81f8a6707%3A0x5d04104c1ab99c48!2s610%20Water%20St%2C%20St.%20John&#39;s%2C%20NL%20A1E%202T6!5e0!3m2!1sen!2sca!4v1754918520898!5m2!1sen!2sca"
          width="600"
          height="475"
          allowFullScreen=""
          title="location"
          loading="lazy"
        ></iframe>
      </section>

      <section className="contactInfoContainer" >
        <section className="getInTouch">
          <h3>Get In Touch</h3>
          <div className="getInTouchContent">
            <address>610 Water Street</address>
            <address>St. John's, NL</address>
            <address>A1E 2T6</address>
            <br />
            <address>
              <strong>Phone: </strong>
              <a href="tel:7096359247"> (709) 635-9247</a>
            </address>
            <address>
              <strong>Email: </strong>
              <a href="mailto:contact@momandpop.com">contact@momandpop.com</a>
            </address>
          </div>
        </section>

        <section className="storeHours">
          <h3>Store Hours</h3>
          <div className="storeHoursContent">
            <ul>
              <li>
                <strong>Monday – Friday</strong>
                <span>
                  <time datetime="09:00">9:00 AM</time> –{" "}
                  <time datetime="19:00">7:00 PM</time>
                </span>
              </li>
              <li>
                <strong>Saturday</strong>
                <span>
                  <time datetime="09:00">9:00 AM</time> –{" "}
                  <time datetime="17:00">5:00 PM</time>
                </span>
              </li>
              <li>
                <strong>Sunday</strong>
                <span>Closed</span>
              </li>
            </ul>
          </div>
        </section>
      </section>
    </section>
  );
}

export default Contact;
