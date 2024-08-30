// src/components/NavigationBar.js
import React from 'react';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <nav className="bg-black shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            {/* Logo */}
            <div>
              <Link to="/" className="flex items-center py-5 px-2 text-gray-700 hover:text-logo-yellow">
                <img
                  src="/images/logo-navigationbar.png"
                  alt="EatUp Logo"
                  className="h-14 w-24 mr-2 transition-transform duration-300 hover:scale-110" /* Added animation classes */
                />
              </Link>
            </div>

            {/* Primary Nav */}
            <div className="hidden md:flex items-center space-x-1">
              <Link to="/" className="py-5 px-3 text-gray-200 hover:text-main-yellow">Home</Link>
              <Link to="/menu" className="py-5 px-3 text-gray-200 hover:text-main-yellow">Menu</Link>
              <Link to="/order" className="py-5 px-3 text-gray-200 hover:text-main-yellow">Order</Link>
              <Link to="/contact" className="py-5 px-3 text-gray-200 hover:text-main-yellow">Contact</Link>
              <Link to="/policies" className="py-5 px-3 text-gray-200 hover:text-main-yellow">Policies</Link>
            </div>
          </div>

          {/* Secondary Nav */}
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/signin" className="py-2 px-3 bg-logo-yellow text-white rounded hover:text-gray-700">Sign In</Link>
            <Link to="/signup" className="py-2 px-3 bg-gray-700 text-white rounded hover:text-main-yellow">Sign Up</Link>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden flex items-center">
            <button className="mobile-menu-button">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="mobile-menu hidden md:hidden">
        <Link to="/" className="block py-2 px-4 text-sm text-gray-200 hover:text-main-yellow">Home</Link>
        <Link to="/menu" className="block py-2 px-4 text-sm text-gray-200 hover:text-main-yellow">Menu</Link>
        <Link to="/order" className="block py-2 px-4 text-sm text-gray-200 hover:text-main-yellow">Order</Link>
        <Link to="/contact" className="block py-2 px-4 text-sm text-gray-200 hover:text-main-yellow">Contact</Link>
        <Link to="/policies" className="block py-2 px-4 text-sm text-gray-200 hover:text-main-yellow">Policies</Link>
      </div>
    </nav>
  );
};

export default NavigationBar;