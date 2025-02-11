import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import VehicleCard from "./VehicleCard";
import { UserContext } from "@/assets/context/UserContext";

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const fetchVehicles = async () => {
    try {
      const carsResponse = await fetch("http://localhost:3000/car");
      const adsResponse = await fetch("http://localhost:3000/ad");
      if (!carsResponse.ok || !adsResponse.ok) throw new Error("Greška pri učitavanju podataka");
      const cars = await carsResponse.json();
      const ads = await adsResponse.json();
      const vehiclesWithPrice = cars.map((car) => {
        const ad = ads.find((ad) => Number(ad.carId) === Number(car.id));
        return { ...car, price: ad ? ad.price : "Cena nije dostupna" };
      });
      setVehicles(vehiclesWithPrice);
    } catch (error) {
      console.error("Greška prilikom učitavanja podataka:", error);
    }
  };

  useEffect(() => { fetchVehicles(); }, []);

  const handleDelete = async (carId) => {
    try {
      await fetch(`http://localhost:3000/car/${carId}`, { method: "DELETE" });
      const adsResponse = await fetch(`http://localhost:3000/ad?carId=${carId}`);
      const ads = await adsResponse.json();
      if (ads.length > 0) {
        await fetch(`http://localhost:3000/ad/${ads[0].id}`, { method: "DELETE" });
      }
      fetchVehicles();
    } catch (error) {
      console.error("Greška pri brisanju oglasa i vozila:", error);
    }
  };

  if (!vehicles || vehicles.length === 0) {
    return <div className="text-center text-gray-600">Trenutno nema dostupnih vozila.</div>;
  }

  return (
    <div>
      {user && user.role === "owner" && (
        <button className="mb-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300" onClick={() => navigate("/addad")}>Dodaj novi oglas</button>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {vehicles.map((vehicle) => (
          <VehicleCard key={vehicle.id} id={vehicle.id} name={vehicle.name} description={vehicle.description} price={vehicle.price} image={vehicle.image} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};
export default VehicleList;