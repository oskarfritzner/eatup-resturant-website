// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your pages
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import MenuPage from './pages/MenuPage';
import OrderPage from './pages/OrderPage';
import PoliciesPage from './pages/PoliciesPage';

// Import components
import NavigationBar from './components/NavigationBar'; // Make sure this matches the file name exactly

const App = () => {
  return (
    <Router>
      <div className="App">
        <NavigationBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/policies" element={<PoliciesPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;