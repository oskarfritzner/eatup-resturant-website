import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form data
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all fields', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: 'colored',
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission (replace with actual submission logic)
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        message: '',
      });
      toast.success('Your message has been sent!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: 'colored',
      });
    }, 2000);
  };

  return (
    <div className="contact-page">
      <ToastContainer />
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">Contact Us</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-white p-8 shadow-lg rounded-lg">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    rows="6"
                  ></textarea>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className={`bg-black text-white py-2 px-6 rounded hover:bg-gray-800 transition duration-300 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            </div>

            {/* Contact Information */}
            <div className="bg-white p-8 shadow-lg rounded-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h3>
              <p className="text-gray-600 mb-4">
                Have questions or need help? Contact us using the form, or reach out directly through our contact information below.
              </p>
              <p className="text-gray-800 font-bold">Address</p>
              <p className="text-gray-600 mb-4">1234 Restaurant St, Food City, FC 56789</p>

              <p className="text-gray-800 font-bold">Phone</p>
              <p className="text-gray-600 mb-4">+1 234 567 8900</p>

              <p className="text-gray-800 font-bold">Email</p>
              <p className="text-gray-600">contact@eatup.com</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;