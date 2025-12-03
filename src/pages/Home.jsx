import { useCart } from '../context/CartContext';
import products from '../data/products';

const Home = () => {
  const { addToCart } = useCart();

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

      {/* Products */}
      <section id="products" className="section-p1">
        <h2>Featured Products</h2>
        <p>Summer Collection New Modern Design</p>
        <div className="prod-container">
          {products.slice(0, 8).map(product => (
            <div key={product.id} className="pro">
              <img src={product.image} alt={product.name} />
              <div className="des">
                <span>{product.brand}</span>
                <h5>{product.name}</h5>
                <div className="star">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
                <h4>${product.price}</h4>
              </div>
              <button 
                className="cart-add-btn"
                onClick={() => addToCart(product)}
              >
                <i className="fa-solid fa-cart-shopping"></i>
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
