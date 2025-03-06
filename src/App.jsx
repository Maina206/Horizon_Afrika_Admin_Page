import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import ButtonBar from "./components/ButtonBar";
import PackageCard from "./components/PackageCard";
import BookingTable from "./components/BookingsTable";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  const [packages, setPackages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [error, setError] = useState(null);

  const fetchPackages = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No authentication token found! Redirecting to login...");
      setError("You must be logged in to view packages.");
      return;
    }

    axios
      .get("http://127.0.0.1:5000/packages", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("Fetched packages:", response.data);
        setPackages(Array.isArray(response.data) ? response.data : []);
      })
      .catch((error) => {
        console.error(
          "Error fetching packages:",
          error.response?.data || error.message
        );
        setPackages([]);
        setError(error.response?.data?.message || "Failed to load packages");
      });
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = packages.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <ButtonBar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        {error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <>
                  {currentItems.length > 0 ? (
                    currentItems.map((pkg, index) => (
                      <PackageCard
                        key={index}
                        {...pkg}
                        packageData={pkg}
                        onPackageUpdate={fetchPackages}
                      />
                    ))
                  ) : (
                    <p className="text-center">
                      Loading Available Packages....
                    </p>
                  )}

                  {/* Pagination */}
                  <div className="flex justify-center mt-4">
                    {Array.from(
                      { length: Math.ceil(packages.length / itemsPerPage) },
                      (_, i) => (
                        <button
                          key={i + 1}
                          onClick={() => paginate(i + 1)}
                          className={`mx-1 px-3 py-1 rounded ${
                            currentPage === i + 1
                              ? "bg-blue-500 text-white"
                              : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          {i + 1}
                        </button>
                      )
                    )}
                  </div>
                </>
              }
            />
            <Route path="/bookings" element={<BookingTable />} />
          </Routes>
        )}
      </main>
      <footer className="bg-orange-500 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">HorizonAfrika</h3>
              <p className="text-sm">
                Kenya's leading tour and travels booking website.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Follow Us:</h3>
              <p className="text-sm">
                Join the thousands of other followers on our social platform and
                get our latest offers
              </p>
              <div className="flex justify-end gap-3 mt-3">
                <a href="#" className="text-xl hover:text-gray-300">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="#" className="text-xl hover:text-gray-300">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-xl hover:text-gray-300">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="text-xl hover:text-gray-300">
                  <i className="fas fa-envelope"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
