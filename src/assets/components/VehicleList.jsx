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

      // Kombinovanje vozila sa oglasima
      const vehiclesWithPrice = cars.map((car) => {
        const ad = ads.find((ad) => Number(ad.carId) === Number(car.id));
        return {
          ...car,
          price: ad ? ad.price : "Cena nije dostupna", // Cena nije dostupna ako nema oglasa
        };
      });

      console.log("Vehicles with Price:", vehiclesWithPrice); // Logovanje za proveru
      setVehicles(vehiclesWithPrice); // Ažuriranje stanja sa svim vozilima
    } catch (error) {
      console.error("Greška prilikom učitavanja podataka:", error);
    }
  };

  // Poziv funkcije za učitavanje podataka kada se komponenta učita
  useEffect(() => {
    fetchVehicles();
  }, []);

  // Fallback ako nema vozila
  if (!vehicles || vehicles.length === 0) {
    return <div className="text-center text-gray-600">Trenutno nema dostupnih vozila.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {vehicles.map((vehicle) => (
        <VehicleCard
          key={vehicle.id}
          id={vehicle.id}
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
