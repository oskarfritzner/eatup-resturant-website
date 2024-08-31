import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, Timestamp, query, where } from 'firebase/firestore';
import { firestore } from '../services/firebase';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isAfter, isBefore, addMinutes } from 'date-fns';
import { Link } from 'react-router-dom';

const BookTable = () => {
  const [tables, setTables] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selectedTable, setSelectedTable] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const tablesCollection = collection(firestore, 'tables');
        const tablesSnapshot = await getDocs(tablesCollection);
        const tablesList = tablesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTables(tablesList);
      } catch (error) {
        console.error('Error fetching tables:', error);
      }
    };

    fetchTables();
  }, []);

  const handleFetchBookings = async (date) => {
    try {
      const bookingsQuery = query(collection(firestore, 'bookings'), where('date', '==', date));
      const bookingsSnapshot = await getDocs(bookingsQuery);
      const bookingsList = bookingsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBookings(bookingsList);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    handleFetchBookings(date);
  };

  const checkAvailability = (tableNumber, date, startTime, endTime) => {
    const selectedStart = new Date(`${date}T${startTime}`);
    const selectedEnd = new Date(`${date}T${endTime}`);

    for (let booking of bookings) {
      if (booking.tableNumber === tableNumber) {
        const bookingStart = new Date(`${booking.date}T${booking.startTime}`);
        const bookingEnd = new Date(`${booking.date}T${booking.endTime}`);

        if (
          (isBefore(selectedStart, bookingEnd) && isAfter(selectedEnd, bookingStart)) || // Overlap check
          (selectedStart.getTime() === bookingStart.getTime() && selectedEnd.getTime() === bookingEnd.getTime()) // Exact match check
        ) {
          return false; // Not available
        }
      }
    }
    return true; // Available
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedTable || !selectedDate || !selectedTime || !customerName || !customerEmail) {
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

    // Calculate end time (1.5 hours after start time)
    const selectedStart = new Date(`${selectedDate}T${selectedTime}`);
    const endDate = addMinutes(selectedStart, 90); // Add 90 minutes
    const formattedEndTime = endDate.toTimeString().substring(0, 5); // Format as HH:mm

    if (!checkAvailability(selectedTable, selectedDate, selectedTime, formattedEndTime)) {
      toast.error('This time slot is already booked. Please select a different time.', {
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

    setLoading(true);

    try {
      // Add new booking to Firestore
      await addDoc(collection(firestore, 'bookings'), {
        tableNumber: selectedTable,
        date: selectedDate,
        startTime: selectedTime,
        endTime: formattedEndTime,
        customerName,
        customerEmail,
        createdAt: Timestamp.now(),
      });

      setLoading(false);
      setSelectedTable('');
      setSelectedDate('');
      setSelectedTime('');
      setCustomerName('');
      setCustomerEmail('');

      toast.success('Your booking has been confirmed for 1.5 hours!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: 'colored',
      });

    } catch (error) {
      console.error('Error booking table:', error);
      toast.error('There was an issue booking your table. Please try again.', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: 'colored',
      });
      setLoading(false);
    }
  }; 

  return (
    <div className="book-table-page">
      <ToastContainer />
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">Book a Table</h2>

          <form onSubmit={handleSubmit} className="bg-white p-8 shadow-lg rounded-lg max-w-lg mx-auto">
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="date">
                Select Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={selectedDate}
                onChange={handleDateChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="time">
                Select Time (Bookings are for 1.5 hours)
              </label>
              <input
                type="time"
                id="time"
                name="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="table">
                Select Table
              </label>
              <select
                id="table"
                name="table"
                value={selectedTable}
                onChange={(e) => setSelectedTable(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              >
                <option value="" disabled>Select a Table</option>
                {tables.map((table) => (
                  <option key={table.id} value={table.tableNumber}>
                    Table {table.tableNumber} (Seats {table.capacity})
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className={`bg-black text-white py-2 px-6 rounded hover:bg-gray-800 transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                {loading ? 'Booking...' : 'Book Now'}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              For bookings longer than 1.5 hours, please contact us via our <Link to="/contact" className="text-blue-500">Contact page</Link>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookTable;