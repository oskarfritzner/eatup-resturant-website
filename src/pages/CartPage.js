// src/pages/CartPage.js
import React from 'react';
import { useCart } from '../context/CartContext';
import { getAuth } from 'firebase/auth';
import { firestore } from '../services/firebase'; // Import Firestore instance
import { collection, addDoc, Timestamp } from 'firebase/firestore'; // Import Firestore functions
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import { FaCheckCircle } from 'react-icons/fa'; // Import check icon from React Icons

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart } = useCart(); // Destructure cart management functions
  const auth = getAuth(); // Initialize Firebase Auth

  const handleSendOrder = async () => {
    console.log('handleSendOrder called'); // Debugging: Check if function is called
    const user = auth.currentUser;
    console.log('Current user:', user); // Debugging: Check user state

    if (user) {
      try {
        // Prepare order data
        const orderData = {
          userId: user.uid,
          userEmail: user.email,
          items: cartItems,
          createdAt: Timestamp.now(),
        };

        // Reference to the 'orders' collection
        const ordersCollection = collection(firestore, 'orders');

        // Save the order to Firestore
        await addDoc(ordersCollection, orderData);
        console.log('Order sent:', orderData); // Debugging: Confirm order sent

        // Show success toast notification
        toast.success(
          <div className="flex items-center">
            <FaCheckCircle className="text-green-500 mr-2" /> {/* Check Icon */}
            Your order has been sent successfully!
          </div>,
          {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "colored",
          }
        );

        clearCart(); // Clear the cart after order is sent
      } catch (error) {
        console.error('Error sending order:', error); // Debugging: Check for errors
        toast.error('There was an issue sending your order. Please try again.', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });
      }
    } else {
      console.log('User not logged in'); // Debugging: Confirm user is not logged in

      toast.info('Please log in to send your order.', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });

      window.location.href = '/login'; // Redirect to login page
    }
  };

  if (cartItems.length === 0) {
    return <div className="text-center py-20">Your cart is empty.</div>;
  }

  return (
    <div className="cart-page">
      <ToastContainer /> {/* Ensure ToastContainer is always rendered */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center text-gray-800">Your Cart</h2>
          <div className="mt-10">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center bg-main-yellow p-4 mb-4 rounded-lg shadow-lg">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                  <p className="mt-2 text-gray-700">{item.description}</p>
                  <p className="mt-2 text-gray-800 font-bold">${item.price}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)} // Button to remove item from cart
                  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-400 transition duration-300"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <button
              onClick={handleSendOrder} // Button to send order
              className="bg-black text-white py-3 px-6 rounded hover:bg-gray-800 transition duration-300"
            >
              Send Order
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CartPage;