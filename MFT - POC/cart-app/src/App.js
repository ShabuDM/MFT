import React,{ useEffect, useState } from "react";
import "./App.css";
import eventBus from "host/EventBus";
function App() {
  const [cart, setCart] = useState([]);

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };
  useEffect(() => {
    const handleAddToCart = (product) => {
      setCart((prevCart) => [...prevCart, product]);
    };
    eventBus.subscribe("add-to-cart", handleAddToCart);
    return () => {
      eventBus.unsubscribe("add-to-cart", handleAddToCart);
    };
  }, []);
  return (
    <div className="App">
      <div className="cart-section">
        <h2>Shopping Cart</h2>
        {cart.length === 0 ? (
          <p>No items in the cart.</p>
        ) : (
          cart.map((item, index) => (
            <div key={index} class="cart-item">
              <p>{item.category}</p>
              <span>Rs {item.price}</span>
            </div>
          ))
        )}
        {cart.length !== 0 && (
          <div>
            <div className="cart-total">
              <p>Total: Rs {calculateTotalPrice().toFixed(2)}</p>
            </div>
            <button className="checkout-button">Proceed to Checkout</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
