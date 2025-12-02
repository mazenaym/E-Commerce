import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { 
    cart, 
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotal 
  } = useCart();

  const subtotal = getTotal();
  const shipping = cart.length > 0 ? 15.00 : 0;
  const total = (parseFloat(subtotal) + shipping).toFixed(2);

  return (
    <>
      {/* Page Header */}
      <section id="page-header" className="about-header">
        <h2>#cart</h2>
        <p>Add your coupon code & SAVE upto 70%!</p>
      </section>

      {/* Cart Section */}
      <section id="cart" className="section-p1">
        {cart.length === 0 ? (
          <div className="empty-cart">
            <i className="fa-solid fa-cart-shopping" style={{ fontSize: '80px', color: '#ccc', marginBottom: '20px' }}></i>
            <h2>Your cart is empty</h2>
            <p>Add some products to your cart to see them here!</p>
            <Link to="/shop" className="normal">Continue Shopping</Link>
          </div>
        ) : (
          <>
            <table width="100%">
              <thead>
                <tr>
                  <td>Remove</td>
                  <td>Image</td>
                  <td>Product</td>
                  <td>Price</td>
                  <td>Quantity</td>
                  <td>Subtotal</td>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <button 
                        className="remove-btn"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <i className="far fa-times-circle"></i>
                      </button>
                    </td>
                    <td>
                      <img src={item.image} alt={item.name} />
                    </td>
                    <td>{item.name}</td>
                    <td>${item.price}</td>
                    <td>
                      <div className="quantity-control">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Cart Actions */}
            <div className="cart-actions section-p1">
              <div className="coupon">
                <h3>Apply Coupon</h3>
                <div className="coupon-input">
                  <input type="text" placeholder="Enter Your Coupon" />
                  <button className="normal">Apply</button>
                </div>
              </div>

              <div className="cart-total">
                <h3>Cart Totals</h3>
                <table>
                  <tbody>
                    <tr>
                      <td>Cart Subtotal</td>
                      <td>$ {subtotal}</td>
                    </tr>
                    <tr>
                      <td>Shipping</td>
                      <td>$ {shipping.toFixed(2)}</td>
                    </tr>
                    <tr className="total-row">
                      <td><strong>Total</strong></td>
                      <td><strong>$ {total}</strong></td>
                    </tr>
                  </tbody>
                </table>
                <button className="normal">Proceed to checkout</button>
                <button 
                  className="clear-cart-btn"
                  onClick={clearCart}
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default Cart;