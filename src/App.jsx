import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import PackageCard from "./components/PackageCard";
import BookingTable from "./components/BookingsTable";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  const [packages, setPackages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    fetch("packages.json")
      .then((response) => response.json())
      .then((data) => setPackages(data))
      .catch((error) => console.error("Error fetching package data:", error));
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = packages.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <SearchBar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Routes>
          <Route
            path="/"
            element={
              <>
                {currentItems.map((pkg, index) => (
                  <PackageCard key={index} {...pkg} />
                ))}

                <div className="flex justify-center mt-4">
                  {Array.from(
                    { length: Math.ceil(packages.length / itemsPerPage) },
                    (_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => paginate(i + 1)}
                        className={`mx-1 px-3 py-1 rounded ${
                          currentPage === i + 1
                            ? "bg-orange-500 text-white"
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
