// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext'; // Import CartProvider

// Import your pages
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import MenuPage from './pages/MenuPage';
import OrderPage from './pages/OrderPage';
import PoliciesPage from './pages/PoliciesPage';
import CartPage from './pages/CartPage'; // Import CartPage

// Import components
import NavigationBar from './components/NavigationBar';

const App = () => {
  return (
    <CartProvider>
      {/* Wrap application in CartProvider */}
      <Router>
        <div className="App">
          <NavigationBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/policies" element={<PoliciesPage />} />
            <Route path="/cart" element={<CartPage />} /> {/* Add CartPage route */}
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;