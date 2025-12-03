import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

const Wishlist = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  return (
    <>
      {/* Page Header */}
      <section id="page-header" className="about-header">
        <h2>#wishlist</h2>
        <p>Your favorite products in one place!</p>
      </section>

      {/* Wishlist Section */}
      <section id="wishlist" className="section-p1">
        {wishlist.length === 0 ? (
          <div className="empty-wishlist">
            <i className="fa-regular fa-heart" style={{ fontSize: '80px', color: '#ccc', marginBottom: '20px' }}></i>
            <h2>Your wishlist is empty</h2>
            <p>Save your favorite products to see them here!</p>
            <Link to="/shop" className="normal">Continue Shopping</Link>
          </div>
        ) : (
          <>
            <div className="wishlist-header">
              <h2>My Wishlist ({wishlist.length} items)</h2>
              <button className="clear-wishlist-btn" onClick={clearWishlist}>
                <i className="fa-solid fa-trash"></i> Clear All
              </button>
            </div>

            <div className="wishlist-grid">
              {wishlist.map((product) => (
                <div key={product.id} className="wishlist-item">
                  <button 
                    className="remove-wishlist-btn"
                    onClick={() => removeFromWishlist(product.id)}
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>

                  <Link to={`/product/${product.id}`} className="product-image">
                    <img src={product.image} alt={product.name} />
                  </Link>

                  <div className="product-details">
                    <span className="brand">{product.brand}</span>
                    <Link to={`/product/${product.id}`}>
                      <h4>{product.name}</h4>
                    </Link>
                    
                    <div className="rating">
                      {[...Array(5)].map((_, i) => (
                        <i 
                          key={i}
                          className={`fa-solid fa-star ${i < product.rating ? '' : 'empty'}`}
                        />
                      ))}
                    </div>

                    <div className="price-section">
                      <h3>${product.price}</h3>
                      <span className="stock in-stock">
                        <i className="fa-solid fa-check"></i> In Stock
                      </span>
                    </div>

                    <div className="action-buttons">
                      <button 
                        className="move-to-cart-btn normal"
                        onClick={() => handleMoveToCart(product)}
                      >
                        <i className="fa-solid fa-cart-shopping"></i>
                        Move to Cart
                      </button>
                      <Link 
                        to={`/product/${product.id}`}
                        className="view-details-btn"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="wishlist-actions">
              <Link to="/shop" className="normal">
                <i className="fa-solid fa-arrow-left"></i>
                Continue Shopping
              </Link>
              <button 
                className="add-all-to-cart normal"
                onClick={() => {
                  wishlist.forEach(product => addToCart(product));
                  clearWishlist();
                }}
              >
                <i className="fa-solid fa-cart-plus"></i>
                Add All to Cart
              </button>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default Wishlist;