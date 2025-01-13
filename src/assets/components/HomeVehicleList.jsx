import React, { useEffect, useState } from "react";
import VehicleCard from "./VehicleCard";

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);

  // Funkcija za učitavanje vozila i cena
  const fetchVehicles = async () => {
    try {
      const carsResponse = await fetch("http://localhost:3000/car");
      const adsResponse = await fetch("http://localhost:3000/ad");

      if (!carsResponse.ok || !adsResponse.ok) {
        throw new Error("Greška pri učitavanju podataka");
      }

      const cars = await carsResponse.json();
      const ads = await adsResponse.json();

      // Dodavanje cene za vozila
      const vehiclesWithPrice = cars.map((car) => {
        const ad = ads.find((ad) => Number(ad.carId) === Number(car.id));
        return {
          ...car,
          price: ad ? ad.price : "Cena nije dostupna",
        };
      });

      // Postavljanje prvih 3 vozila u stanje
      setVehicles(vehiclesWithPrice.slice(0, 3));
    } catch (error) {
      console.error("Greška prilikom učitavanja podataka:", error);
    }
  };

  // Poziv funkcije za učitavanje podataka kada se komponenta učita
  useEffect(() => {
    fetchVehicles();
  }, []);

  if (!vehicles || vehicles.length === 0) {
    return <div>No vehicles available</div>; // Ako nema vozila, prikaži poruku
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {vehicles.map((vehicle) => (
        <VehicleCard
          key={vehicle.id}
          name={vehicle.name}
          description={vehicle.description}
          price={vehicle.price}
          image={vehicle.image}
        />
      ))}
    </div>
  );
};

export default VehicleList;
