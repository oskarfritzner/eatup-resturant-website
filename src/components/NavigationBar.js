// src/components/NavigationBar.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, provider } from '../services/firebase';
import { useCart } from '../context/CartContext'; // Import useCart hook
import { FaShoppingCart } from 'react-icons/fa'; // Import cart icon from React Icons

const NavigationBar = () => {
  const [user, setUser] = useState(null);
  const { cartItems } = useCart(); // Destructure cartItems from useCart

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log('User signed in:', result.user);
      })
      .catch((error) => {
        console.error('Error during sign-in:', error);
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('User signed out');
      })
      .catch((error) => {
        console.error('Error during sign-out:', error);
      });
  };

  return (
    <nav className="bg-black shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            {/* Logo */}
            <div>
              <Link to="/" className="flex items-center py-5 px-2 text-gray-700 hover:text-logo-yellow">
                <img src="/images/logo-navigationbar.png" alt="EatUp Logo" className="h-14 w-24 mr-2 transition-transform duration-300 hover:scale-110" />
              </Link>
            </div>

            {/* Primary Nav */}
            <div className="hidden md:flex items-center space-x-1">
              <Link to="/" className="py-5 px-3 text-gray-200 hover:text-main-yellow">Home</Link>
              <Link to="/menu" className="py-5 px-3 text-gray-200 hover:text-main-yellow">Menu</Link>
              <Link to="/contact" className="py-5 px-3 text-gray-200 hover:text-main-yellow">Contact</Link>
              <Link to="/book" className='py-5 px-3 text-gray-200 hover:text-main-yellow'>Book Table</Link>
            </div>
          </div>

          {/* Secondary Nav */}
          <div className="hidden md:flex items-center space-x-4">
            {user && (
              <>
                <span className="text-gray-200 py-2 px-3">Welcome, {user.displayName}</span>
                {/* Cart Icon with Item Count */}
                <Link to="/cart" className="relative text-gray-200 hover:text-main-yellow">
                  <FaShoppingCart size={24} />
                  {cartItems.length > 0 && (
                    <span className="absolute top-0 right-0 inline-block w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {cartItems.length}
                    </span>
                  )}
                </Link>
                <button onClick={handleSignOut} className="py-2 px-3 bg-red-500 text-white rounded hover:bg-red-400">
                  Sign Out
                </button>
              </>
            )}
            {!user && (
              <button onClick={handleSignIn} className="py-2 px-3 bg-main-yellow text-black rounded hover:bg-yellow-500">
                Sign in with Google
              </button>
            )}
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
        {user ? (
          <>
            {/* Mobile Cart Icon */}
            <Link to="/cart" className="block py-2 px-4 text-sm text-gray-200 hover:text-main-yellow">
              Cart ({cartItems.length})
            </Link>
            <button onClick={handleSignOut} className="block py-2 px-4 text-sm bg-red-500 text-white rounded hover:bg-red-400">
              Sign Out
            </button>
          </>
        ) : (
          <button onClick={handleSignIn} className="block py-2 px-4 text-sm bg-main-yellow text-black rounded hover:bg-yellow-500">
            Sign in with Google
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavigationBar;