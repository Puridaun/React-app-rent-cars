import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const Footer = () => {
  return (
    <div id="constact-section" className="footer-container">
      <div className="footer-content">
       
        <div className="footer-contact">
          <h3 className="footer-title">Contact Us</h3>
          <div className="contact-item">
            <Phone className="contact-icon" size={18} />
            <span>+1 (555) 123-4567</span>
          </div>
          <div className="contact-item">
            <Mail className="contact-icon" size={18} />
            <span>info@carrental.com</span>
          </div>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-links">
            
          
            <li>
              <a href="">Pricing</a>
            </li>
            <li>
              <a href="">Locations</a>
            </li>
          </ul>
        </div>

        
        <div className="footer-section">
          <h3 className="footer-title">Services</h3>
          <ul className="footer-links">
            <li>
              <a href="">Economy Cars</a>
            </li>
            <li>
              <a href="">Luxury Vehicles</a>
            </li>
          </ul>
        </div>

      
        <div className="footer-section">
          <h3 className="footer-title">Stay Connected</h3>

          <div className="newsletter">
            <p className="newsletter-text">Get updates on special offers</p>
            <div className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email"
                className="newsletter-input"
              />
              <button type="button" className="newsletter-btn">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

     
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; 2025 CarRental Pro. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
           
          </div>
        </div>
      </div>
    </div>
  );
};
