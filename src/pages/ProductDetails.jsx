import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import products from '../data/products';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();
  
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Find product
    const foundProduct = products.find(p => p.id === parseInt(id));
    setProduct(foundProduct);
    
    if (foundProduct) {
      setMainImage(foundProduct.image);
      
      // Get related products (same brand)
      const related = products
        .filter(p => p.brand === foundProduct.brand && p.id !== foundProduct.id)
        .slice(0, 4);
      setRelatedProducts(related);
    }
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    
    addToCart({ ...product, size: selectedSize, quantity });
  };

  const handleQuantityChange = (type) => {
    if (type === 'increase') {
      setQuantity(prev => prev + 1);
    } else if (type === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  if (!product) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading product...</p>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);

  return (
    <>
      {/* Breadcrumb */}
      <section id="breadcrumb" className="section-p1">
        <Link to="/">Home</Link> / 
        <Link to="/shop"> Shop</Link> / 
        <span> {product.name}</span>
      </section>

      {/* Product Details */}
      <section id="product-details" className="section-p1">
        <div className="product-images">
          <div className="main-image">
            <img src={mainImage} alt={product.name} />
            <button 
              className={`wishlist-btn ${inWishlist ? 'active' : ''}`}
              onClick={() => addToWishlist(product)}
              title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <i className={`fa${inWishlist ? 's' : 'r'} fa-heart`}></i>
            </button>
          </div>
          
          {/* Small Images */}
          <div className="small-images">
            <img 
              src={product.image} 
              alt="" 
              className={mainImage === product.image ? 'active' : ''}
              onClick={() => setMainImage(product.image)}
            />
          </div>
        </div>

        <div className="product-info">
          {/* Brand Badge */}
          <span className="product-brand">{product.brand}</span>
          
          {/* Product Title */}
          <h1 className="product-title">{product.name}</h1>
          
          {/* Rating */}
          <div className="rating">
            {[...Array(5)].map((_, i) => (
              <i 
                key={i}
                className={`fa-solid fa-star ${i < product.rating ? '' : 'empty'}`}
              />
            ))}
            <span className="review-count">(27 reviews)</span>
          </div>

          {/* Price & Stock */}
          <div className="price-section">
            <h2 className="product-price">${product.price}</h2>
            <span className="stock-badge in-stock">
              <i className="fa-solid fa-check"></i> In Stock
            </span>
          </div>

          {/* Size Selection */}
          <div className="size-selection">
            <h5>Select Size:</h5>
            <div className="sizes">
              {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                <button
                  key={size}
                  className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="quantity-section">
            <h5>Quantity:</h5>
            <div className="quantity-control">
              <button onClick={() => handleQuantityChange('decrease')}>
                <i className="fa-solid fa-minus"></i>
              </button>
              <span>{quantity}</span>
              <button onClick={() => handleQuantityChange('increase')}>
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button className="add-to-cart-btn normal" onClick={handleAddToCart}>
              <i className="fa-solid fa-cart-shopping"></i>
              Add to Cart
            </button>
          </div>

          {/* Product Details */}
          <div className="product-description">
            <h4>Product Details</h4>
            <p>
              High-quality {product.brand} {product.name} made from premium materials. 
              Perfect for everyday wear with exceptional comfort and style.
            </p>
            <ul>
              <li><i className="fa-solid fa-check"></i> 100% Cotton</li>
              <li><i className="fa-solid fa-check"></i> Machine Washable</li>
              <li><i className="fa-solid fa-check"></i> Comfortable Fit</li>
              <li><i className="fa-solid fa-check"></i> Available in Multiple Sizes</li>
            </ul>
          </div>

          {/* Shipping Info */}
          <div className="shipping-info">
            <div className="info-item">
              <i className="fa-solid fa-truck"></i>
              <span>Free shipping on orders over $50</span>
            </div>
            <div className="info-item">
              <i className="fa-solid fa-rotate-left"></i>
              <span>30-day return policy</span>
            </div>
            <div className="info-item">
              <i className="fa-solid fa-shield"></i>
              <span>Secure payment</span>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section id="related-products" className="section-p1">
          <h2>Related Products</h2>
          <div className="prod-container">
            {relatedProducts.map(relatedProduct => (
              <div key={relatedProduct.id} className="pro">
                <Link to={`/product/${relatedProduct.id}`}>
                  <img src={relatedProduct.image} alt={relatedProduct.name} />
                </Link>
                <div className="des">
                  <span>{relatedProduct.brand}</span>
                  <h5>{relatedProduct.name}</h5>
                  <div className="star">
                    {[...Array(5)].map((_, i) => (
                      <i 
                        key={i}
                        className={`fa-solid fa-star ${i < relatedProduct.rating ? '' : 'empty'}`}
                      />
                    ))}
                  </div>
                  <h4>${relatedProduct.price}</h4>
                </div>
                <button 
                  className="cart-add-btn"
                  onClick={() => addToCart(relatedProduct)}
                >
                  <i className="fa-solid fa-cart-shopping"></i>
                </button>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default ProductDetails;