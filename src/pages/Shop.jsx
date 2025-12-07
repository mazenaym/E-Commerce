import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import products from '../data/products';

export default function Shop() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();
  
  // ✅ جديد: State للـ hover effect
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const productsPerPage = 8;
  const totalPages = Math.ceil(products.length / productsPerPage);

  useEffect(() => {
    window.scrollTo(0, 0);
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    setFilteredProducts(products.slice(startIndex, endIndex));
  }, [currentPage]);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      {/* Landing Section */}
      <section id="page-header">
        <h2>#stayhome</h2>
        <p>Save more with coupons & up to 70% off!</p>
      </section>

      {/* ✅ معدّل: Products Section */}
      <section id="products" className="section-p1">
        {/* ✅ جديد: Section Header */}
        <div className="section-header">
          <h2>Our Products</h2>
          <p>Discover our latest collection</p>
        </div>

        <div className="prod-container">
          {filteredProducts.map((product, index) => (
            <div 
              key={product.id} 
              className="pro"
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* ✅ جديد: Badges */}
              <div className="product-badges">
                {product.discount && (
                  <span className="badge sale">-{product.discount}%</span>
                )}
                {product.isNew && (
                  <span className="badge new">NEW</span>
                )}
              </div>

              {/* ✅ معدّل: Image Container */}
              <div className="pro-image">
                <Link to={`/product/${product.id}`}>
                  <img src={product.image} alt={product.name} />
                </Link>
                
                {/* ✅ جديد: Overlay Actions */}
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
                    onClick={() => handleAddToCart(product)}
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

              {/* ✅ معدّل: Product Info */}
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
                
                {/* ✅ جديد: Price with old price */}
                <div className="price-box">
                  <h4>${product.price}</h4>
                  {product.oldPrice && (
                    <span className="old-price">${product.oldPrice}</span>
                  )}
                </div>
              </div>

              {/* ✅ جديد: Quick Add Button (Mobile) */}
              <button 
                className="quick-add-btn"
                onClick={() => handleAddToCart(product)}
              >
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Pagination - زي ما هو */}
      <section id="pagination" className="section-p1">
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1); }}
          className={currentPage === 1 ? 'disabled' : ''}
        >
          <i className="fa-solid fa-chevron-left"></i>
        </a>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <a
            key={page}
            href="#"
            onClick={(e) => { e.preventDefault(); handlePageChange(page); }}
            className={currentPage === page ? 'active' : ''}
          >
            {page}
          </a>
        ))}

        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1); }}
          className={currentPage === totalPages ? 'disabled' : ''}
        >
          <i className="fa-solid fa-chevron-right"></i>
        </a>
      </section>
    </>
  );
}