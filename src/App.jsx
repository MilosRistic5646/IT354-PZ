import React, { useState, useEffect, useContext } from "react";
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
import SeeProfile from "@/assets/components/SeeProfile";
import ReservedAds from "@/assets/adminPages/ReservedAds"; // Dodali smo novu stranicu
import { UserContext } from "@/assets/context/UserContext"; 
import AddAd from "@/assets/ownerPages/AddAd";

const App = () => {
  const { user } = useContext(UserContext); 
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/car")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP greška! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        fetch("http://localhost:3000/ad")
          .then((res) => res.json())
          .then((ads) => {
            const vehiclesWithAds = data.map((car) => {
              const ad = ads.find((adItem) => adItem.carId == car.id);
              return {
                ...car,
                price: ad ? ad.price : "N/A",
                image: car.image || "/slike/default.jpg",
              };
            });
            setVehicles(vehiclesWithAds);
          });
      })
      .catch((error) =>
        console.error("Greška pri učitavanju podataka o vozilima:", error)
      );
  }, []);

  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <Header />

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
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<SeeProfile user={user} />} />
          
          {/* Dodajemo rutu za administratore */}
          {user?.role === "admin" && (
            <Route path="/reserved-ads" element={<ReservedAds />} />
          )}
          <Route path="/addad" element={user?.role === "owner" ? <AddAd /> : <Home />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
