import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer section-p1">
      <div className="col">
        <Link to="/">
          <img className="logo" src="/imgs/logo.png" alt="logo" />
        </Link>
        <h4>Contact</h4>
        <p><strong>Address:</strong> 4 Elgalaa Road, Street 32, Mansoura</p>
        <p><strong>Phone:</strong> +20 12 2222 365 /(+91) 01 2345 6789</p>
        <p><strong>Hours:</strong> 10:00 - 20:00, sat - th</p>
        <div className="follow">
          <h4>Follow Us</h4>
          <div className="social">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-pinterest-p"></i>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-youtube"></i>
            </a>
          </div>
        </div>
      </div>
      
      <div className="col">
        <h4>About</h4>
        <Link to="/about">About Us</Link>
        <Link to="/delivery">Delivery Information</Link>
        <Link to="/privacy">Privacy Policy</Link>
        <Link to="/terms">Terms & Conditions</Link>
        <Link to="/contact">Contact Us</Link>
      </div>
      
      <div className="col">
        <h4>My Account</h4>
        <Link to="/sign-up">Sign In</Link>
        <Link to="/cart">View Cart</Link>
        <Link to="/wishlist">My Wishlist</Link>
        <Link to="/cart">Track My Order</Link>
        <Link to="/about">Help</Link>
      </div>
      
      <div className="col install">
        <h4>Install App</h4>
        <p>From App Store or Google Play</p>
        <div className="row">
          <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer">
            <img src="/imgs/pay/app.jpg" alt="App Store" />
          </a>
          <a href="https://play.google.com" target="_blank" rel="noopener noreferrer">
            <img src="/imgs/pay/play.jpg" alt="Google Play" />
          </a>
        </div>
        <p>Secured Payment Gateways</p>
        <img src="/imgs/pay/pay.png" alt="Payment Methods" />
      </div>
    </footer>
  );
};

export default Footer;