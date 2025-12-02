import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Header = () => {
  const location = useLocation();
  const { getItemCount, setIsCartOpen } = useCart();
  const count = getItemCount();

  return (
    <header id="header">
      <Link to="/">
        <img src="/imgs/logo.png" className="logo" alt="logo" />
      </Link>
      <nav>
        <ul id="nav-items">
          <li>
            <Link 
              className={location.pathname === '/' ? 'active-link' : ''} 
              to="/"
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              className={location.pathname === '/shop' ? 'active-link' : ''} 
              to="/shop"
            >
              Shop
            </Link>
          </li>
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <Link className="sign-up" to="/sign-up">Sign Up</Link>
          <li>
            <Link to="/cart" className="cart-btn">
              <span className="cart-icon">
                <i className="fa-solid fa-cart-shopping"></i>
              </span>
              {count > 0 && <div className="cart-count">{count}</div>}
            </Link>
          </li>
        </ul>
      </nav>
      <div id="mobile">
        <Link to="/cart" className="cart-btn">
          <span className="cart-icon">
            <i className="fa-solid fa-cart-shopping"></i>
          </span>
          {count > 0 && <div className="cart-count">{count}</div>}
        </Link>
      </div>
    </header>
  );
};

export default Header;