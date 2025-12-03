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

      {/* Products Section */}
      <section id="products" className="section-p1">
        <div className="prod-container">
          {filteredProducts.map((product) => (
            <div key={product.id} className="pro">
              <Link to={`/product/${product.id}`}>
                <img src={product.image} alt={product.name} />
              </Link>
              
              <button 
                className={`wishlist-icon ${isInWishlist(product.id) ? 'active' : ''}`}
                onClick={() => addToWishlist(product)}
                title={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <i className={`fa-solid fa-heart`}></i>
              </button>

              <div className="des">
                <span>{product.brand}</span>
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
                </div>
                <h4>${product.price}</h4>
              </div>
              
              <button 
                onClick={() => handleAddToCart(product)}
                className="cart-btn-add"
              >
                <i className="fa-solid fa-cart-shopping"></i>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Pagination */}
      <section id="pagination" className="section-p1">
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1); }}
          className={currentPage === 1 ? 'disabled' : ''}
        >
          ←
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
          →
        </a>
      </section>
    </>
  );
}