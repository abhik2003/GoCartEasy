import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

function Footer() {
  return (
    <div className="footer">
      <div className="row p-5">
        <div className="col-md-6 col-lg-3">
          <h3>About Us</h3>
          <p style={{ textAlign: "justify", paddingRight: "15px" }}>
            We are committed to providing the best shopping experience, offering
            a wide range of quality products and exceptional customer service.
          </p>
        </div>
        <div className="col-md-6 col-lg-3">
          <h3>Contact Us</h3>
          <p>
            <a href="tel:+911234567890" style={{ padding: "0" }}>
              <FaPhone style={{ marginRight: "8px" }} />
              +91 123 4567 890
            </a>
          </p>
          <p>
            <a href="mailto:support@example.com" style={{ padding: "0" }}>
              <FaEnvelope style={{ marginRight: "8px" }} />
              support@gocarteasy.com
            </a>
          </p>
          <p>
            <a href="" style={{ padding: "0" }}>
              <FaMapMarkerAlt style={{ marginRight: "8px" }} />
              12B, Park Street, Kolkata, West Bengal 700016
            </a>
          </p>
        </div>
        <div className="col-md-5 col-lg-2">
          <h3>Quick Links</h3>
          <p>
            <a href="">About us</a>
          </p>
          <p>
            <a href="">Terms & Policy</a>
          </p>
          <p>
            <a href="">FAQ</a>
          </p>
        </div>
        <div className="col-md-7 col-lg-4">
          <form className="newsletter-form">
            <h2>Newsletter</h2>
            <div className="input-group">
              <input type="email" placeholder="Enter your email" />
            </div>
            <button type="submit" className="btn btn-primary">
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="row text-center">
        <div className="col-12">
          <p>
            &copy; {new Date().getFullYear()} GoCartEasy. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
