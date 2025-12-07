import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext'; 
import products from '../data/products';

const Home = () => {
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();  
  
  // : State  hover effect
  const [hoveredProduct, setHoveredProduct] = useState(null);

  return (
    <>
      {/* Hero Section */}
      <section id="hero">
        <h4>Trade-in-offer</h4>
        <h2>Super value deals</h2>
        <h1>On all products</h1>
        <p>Save more with coupons & up to 70% off!</p>
        <button>Shop Now</button>
      </section>

      {/* Features */}
      <section id="feature" className="section-p1">
        <div className="fet-box">
          <img src="/imgs/features/f1.png" alt="" />
          <h6>Free Shipping</h6>
        </div>
        <div className="fet-box">
          <img src="/imgs/features/f2.png" alt="" />
          <h6>Online Order</h6>
        </div>
        <div className="fet-box">
          <img src="/imgs/features/f3.png" alt="" />
          <h6>Save Money</h6>
        </div>
        <div className="fet-box">
          <img src="/imgs/features/f4.png" alt="" />
          <h6>Promotions</h6>
        </div>
        <div className="fet-box">
          <img src="/imgs/features/f5.png" alt="" />
          <h6>Happy Sell</h6>
        </div>
        <div className="fet-box">
          <img src="/imgs/features/f6.png" alt="" />
          <h6>24/7 Support</h6>
        </div>
      </section>

      {/* : Products Section */}
      <section id="products" className="section-p1">
        {/* : Section Header */}
        <div className="section-header">
          <h2>Featured Products</h2>
          <p>Summer Collection New Modern Design</p>
        </div>

        <div className="prod-container">
          {products.slice(0, 8).map((product, index) => (
            <div 
              key={product.id} 
              className="pro"
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* : Badges */}
              <div className="product-badges">
                {product.discount && (
                  <span className="badge sale">-{product.discount}%</span>
                )}
                {product.isNew && (
                  <span className="badge new">NEW</span>
                )}
              </div>

              {/* : Image Container */}
              <div className="pro-image">
                <Link to={`/product/${product.id}`}>
                  <img src={product.image} alt={product.name} />
                </Link>
                
                {/* : Overlay Actions */}
                <div className={`pro-actions ${hoveredProduct === product.id ? 'show' : ''}`}>
                  <button 
                    className={`action-btn ${isInWishlist(product.id) ? 'active' : ''}`}
                    onClick={() => addToWishlist(product)}
                    title="Add to Wishlist"
                  >
                    <i className="fa-solid fa-heart"></i>
                  </button>
                  
                  <button 
                    className="action-btn primary"
                    onClick={() => addToCart(product)}
                    title="Add to Cart"
                  >
                    <i className="fa-solid fa-cart-shopping"></i>
                  </button>
                  
                  <Link 
                    to={`/product/${product.id}`} 
                    className="action-btn"
                    title="Quick View"
                  >
                    <i className="fa-solid fa-eye"></i>
                  </Link>
                </div>
              </div>

              {/* : Product Info */}
              <div className="des">
                <span className="brand">{product.brand}</span>
                <Link to={`/product/${product.id}`}>
                  <h5>{product.name}</h5>
                </Link>
                
                <div className="star">
                  {[...Array(5)].map((_, i) => (
                    <i 
                      key={i}
                      className={`fa-solid fa-star ${i < product.rating ? '' : 'empty'}`}
                    />
                  ))}
                  <span className="review-count">({product.reviews || 0})</span>
                </div>
                
                {/* : Price with old price */}
                <div className="price-box">
                  <h4>${product.price}</h4>
                  {product.oldPrice && (
                    <span className="old-price">${product.oldPrice}</span>
                  )}
                </div>
              </div>

              {/* : Quick Add Button (Mobile) */}
              <button 
                className="quick-add-btn"
                onClick={() => addToCart(product)}
              >
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Banner */}
      <section id="banner" className="section-m1">
        <h4>Repair Services</h4>
        <h2>Up to <span>70% Off</span> - All t-Shirt & Accessories</h2>
        <button className="normal">Explore More</button>
      </section>

      {/*  : New Arrivals Section */}
      <section id="products" className="section-p1">
        <div className="section-header">
          <h2>New Arrivals</h2>
          <p>Check out our latest products</p>
        </div>

        <div className="prod-container">
          {products.slice(8, 12).map((product, index) => (
            <div 
              key={product.id} 
              className="pro"
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Badges */}
              <div className="product-badges">
                {product.discount && (
                  <span className="badge sale">-{product.discount}%</span>
                )}
                <span className="badge new">NEW</span>
              </div>

              {/* Image Container */}
              <div className="pro-image">
                <Link to={`/product/${product.id}`}>
                  <img src={product.image} alt={product.name} />
                </Link>
                
                {/* Overlay Actions */}
                <div className={`pro-actions ${hoveredProduct === product.id ? 'show' : ''}`}>
                  <button 
                    className={`action-btn ${isInWishlist(product.id) ? 'active' : ''}`}
                    onClick={() => addToWishlist(product)}
                  >
                    <i className="fa-solid fa-heart"></i>
                  </button>
                  
                  <button 
                    className="action-btn primary"
                    onClick={() => addToCart(product)}
                  >
                    <i className="fa-solid fa-cart-shopping"></i>
                  </button>
                  
                  <Link to={`/product/${product.id}`} className="action-btn">
                    <i className="fa-solid fa-eye"></i>
                  </Link>
                </div>
              </div>

              {/* Product Info */}
              <div className="des">
                <span className="brand">{product.brand}</span>
                <Link to={`/product/${product.id}`}>
                  <h5>{product.name}</h5>
                </Link>
                
                <div className="star">
                  {[...Array(5)].map((_, i) => (
                    <i 
                      key={i}
                      className={`fa-solid fa-star ${i < product.rating ? '' : 'empty'}`}
                    />
                  ))}
                  <span className="review-count">({product.reviews || 0})</span>
                </div>
                
                <div className="price-box">
                  <h4>${product.price}</h4>
                  {product.oldPrice && (
                    <span className="old-price">${product.oldPrice}</span>
                  )}
                </div>
              </div>

              <button 
                className="quick-add-btn"
                onClick={() => addToCart(product)}
              >
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* SM Banner */}
      <section id="sm-banner" className="section-p1">
        <div className="banner-box">
          <h4>crazy deals</h4>
          <h2>buy 1 get 1 free</h2>
          <span>The best classic dress is on sale at cara</span>
          <button className="white">Learn More</button>
        </div>
        <div className="banner-box banner-box2">
          <h4>spring/summer</h4>
          <h2>upcomming season</h2>
          <span>The best classic dress is on sale at cara</span>
          <button className="white">Collections</button>
        </div>
      </section>

      {/* Banner 3 */}
      <section id="banner-3">
        <div className="banner-box">
          <h2>SEASONAL SALE</h2>
          <h3>Winter Collection -50% OFF</h3>
        </div>
        <div className="banner-box banner-box2">
          <h2>NEW FOOTWEAR COLLECTION</h2>
          <h3>Spring / Summer 2022</h3>
        </div>
        <div className="banner-box banner-box3">
          <h2>T-SHIRTS</h2>
          <h3>New Trendy Prints</h3>
        </div>
      </section>
      
    </>
  );
};

export default Home;