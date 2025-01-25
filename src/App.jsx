import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "@/assets/components/Header";
import Footer from "@/assets/components/Footer";
import Carousel from "@/assets/components/Carousel";
import VehicleList from "@/assets/components/VehicleList";
import HomeVehicleList from "@/assets/components/HomeVehicleList";
import Home from "@/assets/userPages/Home";
import VehiclePage from "@/assets/userPages/VehiclePage";
import ServicesPage from "@/assets/userPages/ServicePage";
import ContactPage from "@/assets/userPages/ContactPage";
import LoginForm from "@/assets/components/LoginForm";
import RegisterPage from "@/assets/userPages/Register";
import Seemore from "@/assets/userPages/Seemore";
import SeeProfile from "@/assets/components/SeeProfile"; // Import za profilnu stranicu

const App = () => {
  const [vehicles, setVehicles] = useState([]); // Stanje za vozila
  const [user, setUser] = useState(null); // Stanje za korisnika

  useEffect(() => {
    // Povlačenje podataka o vozilima iz db.json
    fetch("/db.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP greška! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const vehiclesWithAds = data.car.map((car) => {
          const ad = data.ad.find((adItem) => adItem.carId === car.id);
          return {
            ...car,
            price: ad ? ad.price : "N/A",
            image: ad?.image || "/slike/default.jpg",
          };
        });
        setVehicles(vehiclesWithAds);
      })
      .catch((error) =>
        console.error("Greška pri učitavanju podataka o vozilima:", error)
      );
  }, []);

  // Funkcija za prijavu
  const handleLogin = (userData) => {
    setUser(userData);
  };

  // Funkcija za odjavu
  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        {/* Prosleđujemo user i onLogout ka Header komponenti */}
        <Header user={user} onLogout={handleLogout} />

        {/* Definisanje ruta */}
        <Routes>
          <Route
            path="/"
            element={
              <Home
                carousel={<Carousel />}
                vehicles={<HomeVehicleList vehicles={vehicles} />}
              />
            }
          />
          <Route
            path="/vehicles"
            element={<VehiclePage vehicles={<VehicleList vehicles={vehicles} />} />}
          />
          <Route path="/vehicles/:id" element={<Seemore />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route
            path="/login"
            element={<LoginForm onLogin={handleLogin} />} // Prosleđujemo handleLogin funkciju
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<SeeProfile user={user} />} /> {/* Nova ruta */}
        </Routes>

        {/* Zajednički Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
