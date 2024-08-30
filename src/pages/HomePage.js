// src/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-screen" style={{ backgroundImage: "url('/images/homepage-bg.jpg')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex items-center justify-center h-full text-center">
          <div>
            <h1 className="text-4xl md:text-6xl text-white font-bold">Welcome to EatUp</h1>
            <p className="mt-4 text-lg md:text-xl text-gray-200">Delicious food delivered to your doorstep.</p>
            <Link to="/menu" className="mt-8 inline-block bg-main-yellow text-black font-semibold py-3 px-6 rounded-full hover:bg-yellow-500 transition duration-300">
              Explore Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 bg-main-yellow">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold text-gray-800">Why Choose EatUp?</h2>
          <p className="mt-4 text-gray-700">EatUp is committed to delivering the freshest and most delicious meals straight to your door. Our chefs use only the best ingredients to create meals that are not only tasty but also healthy. Experience the convenience of dining at home with the quality of a gourmet restaurant.</p>
        </div>
      </section>

      {/* Featured Menu Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center text-white">Featured Menu</h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Menu Item 1 */}
            <div className="bg-main-yellow shadow-lg rounded-lg overflow-hidden">
              <img src="/images/gourmet-burger.jpg" alt="Our Gourmet Burger" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">Delicious Burger</h3>
                <p className="mt-2 text-gray-700">Juicy grilled burger with fresh lettuce, tomato, and a special sauce.</p>
                <Link to="/menu" className="mt-4 inline-block text-black hover:text-yellow-600">Order Now</Link>
              </div>
            </div>
            {/* Menu Item 2 */}
            <div className="bg-main-yellow shadow-lg rounded-lg overflow-hidden">
              <img src="/images/pasta-carbonara.jpg" alt="Our Pasta carbonara" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">Pasta Carbonara</h3>
                <p className="mt-2 text-gray-700">Creamy pasta with crispy pancetta, parmesan, and fresh herbs.</p>
                <Link to="/menu" className="mt-4 inline-block text-black hover:text-yellow-600">Order Now</Link>
              </div>
            </div>
            {/* Menu Item 3 */}
            <div className="bg-main-yellow shadow-lg rounded-lg overflow-hidden">
              <img src="/images/pizza-diavola.jpeg" alt="Our pizza diavola" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">Pizza Diavola</h3>
                <p className="mt-2 text-gray-700">Fresh romaine lettuce, croutons, parmesan, and Caesar dressing.</p>
                <Link to="/menu" className="mt-4 inline-block text-black hover:text-yellow-600">Order Now</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-20 bg-main-yellow">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold text-black">Ready to Taste the Best?</h2>
          <Link to="/order" className="mt-8 inline-block bg-black text-white font-semibold py-3 px-6 rounded-full hover:bg-gray-800 transition duration-300">
            Place Your Order
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;