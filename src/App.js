// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FlipkartEcommerce from './FlipkartEcommerce';
import CartPage from './CartPage';

const App = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<FlipkartEcommerce cart={cart} addToCart={addToCart} />}
        />
        <Route
          path="/cart"
          element={<CartPage cart={cart} removeFromCart={removeFromCart} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
