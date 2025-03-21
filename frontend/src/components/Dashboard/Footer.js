import React from "react";
import "../Styles/Footer.css"; // Import the CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          {/* About Section */}
          <div className="footer-about">
            <h2>Parent-Teacher Portal</h2>
            <p>
              A smart platform for seamless communication between parents and teachers.
              Track attendance, monitor student progress, and receive real-time updates 
              on performance, news, and homework—all in one place.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/about">About</a></li>
              <li><a href="/news">News</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="footer-contact">
            <h3>Contact Us</h3>
            <p>Email: support@ptportal.com</p>
            <p>Phone: +91 98765 43210</p>
            <p>Location: Mumbai, India</p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Parent-Teacher Portal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
