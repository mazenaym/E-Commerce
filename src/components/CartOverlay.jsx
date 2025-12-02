import { useCart } from '../context/CartContext';

const CartOverlay = () => {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotal 
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div 
      className="cart-overlay"
      onClick={(e) => {
        if (e.target.className === 'cart-overlay') {
          setIsCartOpen(false);
        }
      }}
    >
      <div className="cart-added" onClick={(e) => e.stopPropagation()}>
        <span 
          className="close-cart" 
          onClick={() => setIsCartOpen(false)}
        >
          <i className="fa-solid fa-xmark"></i>
        </span>
        
        <h3>Added To Cart</h3>
        
        <div className="cart-content">
          {cart.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
              Your cart is empty
            </p>
          ) : (
            cart.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p>${item.price}</p>
                  <span 
                    className="remove-item"
                    onClick={() => removeFromCart(item.id)}
                  >
                    remove
                  </span>
                </div>
                <div className="quantity-controls">
                  <i 
                    className="fa-solid fa-chevron-up"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  ></i>
                  <p className="amount">{item.quantity}</p>
                  <i 
                    className="fa-solid fa-chevron-down"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  ></i>
                </div>
              </div>
            ))
          )}
        </div>
        
        {cart.length > 0 && (
          <div className="cart-footer">
            <h3>Your Total : $ {getTotal()}</h3>
            <button 
              className="clear-cart" 
              onClick={clearCart}
            >
              clear cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartOverlay;