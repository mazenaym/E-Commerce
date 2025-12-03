import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const Header = () => {
  const location = useLocation();
  const { getItemCount } = useCart();
  const { getWishlistCount } = useWishlist();
  
  const cartCount = getItemCount();
  const wishlistCount = getWishlistCount();

  return (
    <header id="header">
      <Link to="/">
        <img src="/imgs/logo.png" className="logo" alt="logo" />
      </Link>
      <nav>
        <ul id="nav-items">
          <li>
            <Link className={location.pathname === '/' ? 'active-link' : ''} to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className={location.pathname === '/shop' ? 'active-link' : ''} to="/shop">
              Shop
            </Link>
          </li>
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          
          <Link className="sign-up" to="/sign-up">Sign Up</Link>
          
          {/* Wishlist - جديد */}
          <li>
            <Link to="/wishlist" className="wishlist-link">
              <span className="wishlist-icon">
                <i className={wishlistCount > 0 ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
                {wishlistCount > 0 && (
                  <span className="wishlist-count">{wishlistCount}</span>
                )}
              </span>
            </Link>
          </li>
          
          {/* Cart */}
          <li>
            <Link to="/cart" className="cart-btn">
              <span className="cart-icon">
                <i className="fa-solid fa-cart-shopping"></i>
              </span>
              {cartCount > 0 && <div className="cart-count">{cartCount}</div>}
            </Link>
          </li>
        </ul>
      </nav>
      
      {/* Mobile */}
      <div id="mobile">
        <Link to="/wishlist" className="wishlist-link">
          <span className="wishlist-icon">
            <i className={wishlistCount > 0 ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
            {wishlistCount > 0 && (
              <span className="wishlist-count">{wishlistCount}</span>
            )}
          </span>
        </Link>
        
        <Link to="/cart" className="cart-btn">
          <span className="cart-icon">
            <i className="fa-solid fa-cart-shopping"></i>
          </span>
          {cartCount > 0 && <div className="cart-count">{cartCount}</div>}
        </Link>
      </div>
    </header>
  );
};

export default Header;