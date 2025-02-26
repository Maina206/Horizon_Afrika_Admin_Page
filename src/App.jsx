import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import PackageCard from "./components/PackageCard";
import BookingTable from "./components/BookingsTable";
import "@fortawesome/fontawesome-free/css/all.min.css";

const packages = [
  {
    title: "05 DAYS GLIMPSE OF KENYA BUDGET SAFARI",
    price: "Ksh15,999",
    image: "./safari.jpeg",
    location: "Samburu",
    booked: "100",
    viewed: "590",
    packageData: {
      packageName: "05 DAYS GLIMPSE OF KENYA BUDGET SAFARI",
      price: "15999",
      location: "Samburu",
      packageType: "Bush",
      activities: "Game Drive, Nature Walk",
      dayCount: "5",
      inclusions: "Transportation, Accommodation, Meals",
      exclusions: "Personal items, Tips",
    },
  },
  {
    title: "6 DAYS KENYA HIGHLIGHTS BUDGET SAFARI",
    price: "Ksh20,047",
    image: "./saf.webp",
    location: "Masaai Mara",
    booked: "200",
    viewed: "300",
    packageData: {
      packageName: "6 DAYS KENYA HIGHLIGHTS BUDGET SAFARI",
      price: "20047",
      location: "Masaai Mara",
      packageType: "Bush",
      activities: "Game Drive, Cultural Visit",
      dayCount: "6",
      inclusions: "Transportation, Accommodation, Meals",
      exclusions: "Personal items, Tips",
    },
  },
  {
    title: "8 DAYS CHEETAH BUDGET SAFARI",
    price: "Ksh11,896",
    image: "./tanzania-7416241_640.jpg",
    location: "Nakuru",
    booked: "188",
    viewed: "189",
    packageData: {
      packageName: "8 DAYS CHEETAH BUDGET SAFARI",
      price: "11896",
      location: "Nakuru",
      packageType: "Bush",
      activities: "Game Drive, Bird Watching",
      dayCount: "8",
      inclusions: "Transportation, Accommodation, Meals",
      exclusions: "Personal items, Tips",
    },
  },
];

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <SearchBar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Routes>
          <Route
            path="/"
            element={packages.map((pkg, index) => (
              <PackageCard key={index} {...pkg} />
            ))}
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
