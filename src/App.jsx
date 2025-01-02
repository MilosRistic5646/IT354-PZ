import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "@/assets/components/Header";
import Footer from "@/assets/components/Footer";
import Carousel from "@/assets/components/Carousel";
import VehicleList from "@/assets/components/VehicleList";
import Home from "@/assets/pages/Home";
import VehiclePage from "@/assets/pages/VehiclePage";
import ServicesPage from "@/assets/pages/ServicePage";
import ContactPage from "@/assets/pages/ContactPage";
import Login from "@/assets/pages/Login";
import RegisterPage from "@/assets/pages/Register"; // Dodato: Stranica za registraciju

const App = () => {
  const [vehicles, setVehicles] = useState([]);

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

  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        {/* Zajednički Header */}
        <Header />

        {/* Definisanje ruta */}
        <Routes>
          <Route
            path="/"
            element={
              <Home
                carousel={<Carousel />}
                vehicles={<VehicleList vehicles={vehicles} />}
              />
            }
          />
          <Route path="/vehicles" element={<VehiclePage vehicles={vehicles} />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} /> {/* Ruta za registraciju */}
        </Routes>

        {/* Zajednički Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
