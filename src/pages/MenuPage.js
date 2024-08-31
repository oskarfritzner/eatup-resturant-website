// src/pages/MenuPage.js
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../services/firebase';
import { useCart } from '../context/CartContext';
import { getAuth } from 'firebase/auth';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaCartPlus } from 'react-icons/fa'; // Import a shopping cart icon

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const auth = getAuth();

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const menuCollection = collection(firestore, 'menuItems');
        const menuSnapshot = await getDocs(menuCollection);
        const menuList = menuSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setMenuItems(menuList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching menu items:', error);
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  const handleOrder = (item) => {
    const user = auth.currentUser;
    if (user) {
      addToCart(item);
      toast.success(
        <div className="flex items-center">
          <FaCartPlus className="text-green-500 mr-2" /> {/* Add shopping cart icon */}
          <span>{`${item.name} added to your cart!`}</span>
        </div>,
        {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
          className: "toast-custom-style", // Add custom class for further customization
        }
      );
    } else {
      alert('Please log in to add items to your cart.');
      window.location.href = '/menu';
    }
  };

  if (loading) {
    return <div className="text-center py-20">Loading menu...</div>;
  }

  return (
    <div className="menu-page">
      <ToastContainer />
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center text-gray-800">Our Menu</h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            {menuItems.map((item) => (
              <div key={item.id} className="bg-main-yellow shadow-lg rounded-lg overflow-hidden">
                <img src={item.imageUrl} alt={item.name} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                  <p className="mt-2 text-gray-700">{item.description}</p>
                  <p className="mt-2 text-gray-800 font-bold">${item.price}</p>
                  <button
                    onClick={() => handleOrder(item)}
                    className="mt-4 bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition duration-300"
                  >
                    Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MenuPage;