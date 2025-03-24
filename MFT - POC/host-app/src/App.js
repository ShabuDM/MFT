import React from 'react';
import './App.css';
import { Link, Routes, Route } from 'react-router-dom';
const CartAPP = React.lazy(() => import('cart/App'));
const ProductAPP = React.lazy(() => import('product/App'));

function App() {
  
  return (
    <div className="App">
      
        {/* <h1>Header Host APP</h1><button onClick={triggerfromHost}> Click Me..!</button> */}
        <h1>Host Application</h1>
        <nav>
          <Link to="/product">Go to Product App</Link> |{' '}
          <Link to="/cart">Go to Cart App</Link>
        </nav>
        <Routes>
          <Route path="/product" element={<ProductAPP />} />
          <Route path="/cart" element={<CartAPP />} />
        </Routes>
        <ProductAPP />
    </div>
  );
}

export default App;
