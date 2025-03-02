import React, { useState, useEffect } from "react";
import "../BookingTable.css";
import { getBookings } from "../apiService";

const ITEMS_PER_PAGE = 10;

const BookingTable = () => {
  const [bookings, setBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const data = await getBookings();
        setBookings(data);
        calculateTotalAmount(data);
        setError(null);
      } catch (e) {
        if (e.message === "Failed to fetch bookings") {
          setError("Unauthorized: Please log in to access bookings.");
        } else {
          setError("Failed to fetch bookings. please try again later");
        }
        console.error("Error loading bookings:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const calculateTotalAmount = (data) => {
    const total = data.reduce((sum, booking) => {
      const amount = parseInt(booking.amountPaid.replace(/[^0-9]/g, ""), 10);
      return sum + (isNaN(amount) ? 0 : amount);
    }, 0);
    setTotalAmount(total);
  };

  // Pagination Logic
  const indexOfLastBooking = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstBooking = indexOfLastBooking - ITEMS_PER_PAGE;
  const currentBookings = bookings.slice(
    indexOfFirstBooking,
    indexOfLastBooking
  );
  const totalPages = Math.ceil(bookings.length / ITEMS_PER_PAGE);

  const nextPage = () =>
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  const prevPage = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));

  if (loading) {
    return <div className="loading">Loading bookings data...</div>;
  }
  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="table-container">
      <div className="table-wrapper">
        {bookings.length === 0 ? (
          <div className="no-data">No bookings found</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>User Name</th>
                <th>Package Name</th>
                <th>Location</th>
                <th>Email</th>
                <th>Amount Paid</th>
              </tr>
            </thead>
            <tbody>
              {currentBookings.map((booking, index) => (
                <tr key={index} className={index % 2 === 0 ? "even" : "odd"}>
                  <td>{booking.userName}</td>
                  <td>{booking.packageName}</td>
                  <td>{booking.location}</td>
                  <td>{booking.email}</td>
                  <td>{booking.amountPaid}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="table-footer">
        <div className="pagination">
          <button onClick={prevPage} disabled={currentPage === 1}>
            &lt; Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={nextPage} disabled={currentPage === totalPages}>
            Next &gt;
          </button>
        </div>
        <div className="total">
          Total Amount Earned: KES {totalAmount.toLocaleString()}{" "}
        </div>
      </div>
    </div>
  );
};

export default BookingTable;
