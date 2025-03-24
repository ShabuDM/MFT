import React, { useEffect, useState } from "react";
const CartAPPImp = React.lazy(() => import("cart/App"));
import eventBus from "host/EventBus";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleAddToCart = (product) => {
    eventBus.publish("add-to-cart", product);
    //alert(`${product.name} added to cart!`);
  };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading)
    return (
      <div className="App">
        <div className="container">
          <div className="product-list">
            <h2>Product List</h2>
            <div>Loading...</div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="App">
      <div className="container">
        <div className="product-list">
          <h2>Product List</h2>
          {products.map((product) => (
            <div key={product.id} className="product-item">
              <img src={product.image} alt="Product Image" />
              <p>
                {product.title} - Rs {product.price}
              </p>
              <button onClick={() => handleAddToCart(product)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
        <CartAPPImp />
      </div>
    </div>
  );
}

export default App;
