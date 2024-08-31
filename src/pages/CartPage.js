// src/pages/CartPage.js
import React from 'react';
import { useCart } from '../context/CartContext';
import { getAuth } from 'firebase/auth';
import { firestore } from '../services/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaCheckCircle } from 'react-icons/fa';

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const auth = getAuth();

  const handleSendOrder = async () => {
    console.log('handleSendOrder called');
    const user = auth.currentUser;
    console.log('Current user:', user);
  
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
        console.log('Order sent:', orderData);
  
        // Show success toast notification
        toast.success(
          <div className="flex items-center">
            <FaCheckCircle className="text-green-500 mr-2" />
            Your order has been sent successfully!
          </div>,
          {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "colored",
          }
        );
  
        // Delay clearing the cart to allow the toast to be visible
        setTimeout(() => {
          clearCart(); // Clear the cart after a delay
        }, 3000); // 3 seconds delay to match toast autoClose duration
  
      } catch (error) {
        console.error('Error sending order:', error);
        toast.error('There was an issue sending your order. Please try again.', {
          position: "bottom-center",
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
      console.log('User not logged in');
      toast.info('Please log in to send your order.', {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
  
      // Redirect after a short delay
      setTimeout(() => {
        window.location.href = '/login';
      }, 3000);
    }
  };

  if (cartItems.length === 0) {
    return <div className="text-center py-20">Your cart is empty.</div>;
  }

  return (
    <div className="cart-page">
      <ToastContainer />
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
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-400 transition duration-300"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <button
              onClick={handleSendOrder}
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