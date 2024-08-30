// src/pages/MenuPage.js
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../services/firebase'; // Import Firestore instance from your firebase config

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]); // State to store menu items
  const [loading, setLoading] = useState(true); // State to handle loading state

  useEffect(() => {
    // Function to fetch menu items from Firestore
    const fetchMenuItems = async () => {
      try {
        const menuCollection = collection(firestore, 'menuItems'); // Reference to the 'menuItems' collection
        const menuSnapshot = await getDocs(menuCollection); // Fetch documents from Firestore
        const menuList = menuSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Map documents to data
        setMenuItems(menuList); // Update state with fetched data
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching menu items:', error);
        setLoading(false);
      }
    };

    fetchMenuItems(); // Call the function to fetch data
  }, []); // Empty dependency array ensures this runs once when component mounts

  if (loading) {
    return <div className="text-center py-20">Loading menu...</div>; // Display loading message
  }

  return (
    <div className="menu-page">
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center text-gray-800">Our Menu</h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            {menuItems.map(item => (
              <div key={item.id} className="bg-main-yellow shadow-lg rounded-lg overflow-hidden">
                <img src={item.imageUrl} alt={item.name} className="w-full h-48 object-cover" /> {/* Display the image */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                  <p className="mt-2 text-gray-700">{item.description}</p>
                  <p className="mt-2 text-gray-800 font-bold">${item.price}</p>
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