import React, { useState, useEffect, useMemo } from "react";
import "../BookingTable.css";
import axios from "axios";

const ITEMS_PER_PAGE = 10;

const BookingTable = () => {
  const [bookings, setBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      axios
        .get("https://horizonafrika-backend.onrender.com/bookings", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log("fetched data:", response.data);
          setBookings(
            Array.isArray(response.data.bookings) ? response.data.bookings : []
          );
          setError(null);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Failed to fetch bookings:", error);
          setError(error.response?.data?.message || "Failed to fetch bookings");
        })
        .finally(() => setLoading(false));
    } catch (error) {
      console.error("Storage access error:", error);
      setError("Authentication issue, please log in again.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    console.log("updated bookings state:", bookings);
  }, [bookings]);

  const totalAmount = useMemo(() => {
    if (!Array.isArray(bookings)) return 0;
    return bookings.reduce((sum, booking) => {
      const amountStr = booking?.price_paid ? String(booking.price_paid) : "0";
      const amount = parseInt(amountStr.replace(/[^0-9]/g, ""), 10);
      return sum + (isNaN(amount) ? 0 : amount);
    }, 0);
  }, [bookings]);

  const totalPages = Math.ceil(bookings.length / ITEMS_PER_PAGE);
  const indexOfLastBooking = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstBooking = indexOfLastBooking - ITEMS_PER_PAGE;
  const currentBookings = bookings.slice(
    indexOfFirstBooking,
    indexOfLastBooking
  );
  console.log("Current bookings on this page:", currentBookings);

  const nextPage = () =>
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  const prevPage = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));

  return (
    <div className="table-container">
      {loading && <div className="loading-message">Loading bookings...</div>}
      {error && <div className="error-message">Error: {error}</div>}
      {!loading && !error && bookings.length === 0 && (
        <div className="empty-message">No bookings available</div>
      )}

      {!loading && !error && bookings.length > 0 && (
        <>
          <div className="table-wrapper">
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
                {Array.isArray(bookings) && bookings.length > 0 ? (
                  bookings.map((booking, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "even" : "odd"}
                    >
                      <td>{booking.user_first_name || "N/A"}</td>
                      <td>{booking.package_name || "N/A"}</td>
                      <td>{booking.location || "N/A"}</td>
                      <td>{booking.user_email || "N/A"}</td>
                      <td>{booking.price_paid || "KES 0"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No bookings available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="table-footer">
            <div className="pagination">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                style={{
                  cursor: currentPage === 1 ? "not-allowed" : "pointer",
                }}
              >
                &lt; Prev
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                style={{
                  cursor:
                    currentPage === totalPages ? "not-allowed" : "pointer",
                }}
              >
                Next &gt;
              </button>
            </div>
            <div className="total">
              Total Amount Earned: KES {totalAmount.toLocaleString()}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BookingTable;
