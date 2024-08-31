// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

// Import your pages
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import MenuPage from './pages/MenuPage';
import PoliciesPage from './pages/PoliciesPage';
import CartPage from './pages/CartPage'; // Import CartPage
import BookTable from './pages/BookTable';

// Import components
import NavigationBar from './components/NavigationBar';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <CartProvider>
      {/* Wrap application in CartProvider */}
      <Router>
        <div className="App">
          <ToastContainer />
          <NavigationBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/book" element={<BookTable />} />
            <Route path="/policies" element={<PoliciesPage />} />
            <Route path="/cart" element={<CartPage />} /> {/* Add CartPage route */}
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;