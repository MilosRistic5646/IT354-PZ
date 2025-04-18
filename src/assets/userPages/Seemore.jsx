import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Footer from "@/assets/components/Footer";
import { UserContext } from "@/assets/context/UserContext";

const Seemore = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicleDetails = async () => {
      try {
        const adResponse = await fetch(`http://localhost:3000/ad/${id}`);
        if (!adResponse.ok) throw new Error("Greška pri učitavanju oglasa");
        const ad = await adResponse.json();

        const carResponse = await fetch(`http://localhost:3000/car/${ad.carId}`);
        if (!carResponse.ok) throw new Error("Greška pri učitavanju podataka o vozilu");
        const car = await carResponse.json();

        setVehicle({ ...car, price: ad.price });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicleDetails();
  }, [id]);

  const handleReserveClick = async () => {
    if (!user) {
      alert("Morate biti ulogovani da biste rezervisali vozilo.");
      return;
    }

    try {
      const classifiedAdResponse = await fetch("http://localhost:3000/classifiedAd");
      const classifiedAds = await classifiedAdResponse.json();
      const maxId = classifiedAds.length > 0
        ? Math.max(...classifiedAds.map(ad => parseInt(ad.id)))
        : 0;

      const reservation = {
        id: (maxId + 1).toString(),
        idCar: vehicle.id,
        idPerson: user.id,
      };

      const postResponse = await fetch("http://localhost:3000/classifiedAd", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reservation),
      });

      if (postResponse.ok) {
        alert("Rezervacija uspešna!");
      } else {
        alert("Došlo je do greške prilikom rezervacije. Pokušajte ponovo.");
      }
    } catch (error) {
      console.error("Greška prilikom pristupa bazi:", error);
      alert("Došlo je do greške. Pokušajte ponovo kasnije.");
    }
  };

  if (loading) 
    return <div className="flex-grow text-center text-gray-800 dark:text-white">Učitavanje...</div>;
  if (error) 
    return <div className="flex-grow text-center text-red-500 dark:text-red-400">Greška: {error}</div>;
  if (!vehicle) 
    return <div className="flex-grow text-center text-gray-800 dark:text-white">Vozilo nije pronađeno.</div>;

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      <div className="flex-grow container mx-auto py-12 px-4">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <img
            src={vehicle.image}
            alt={vehicle.name}
            className="w-full md:w-1/2 h-auto object-cover rounded-lg shadow-lg"
          />
          <div className="flex flex-col gap-4 md:w-1/2 text-black dark:text-white">
            <h2 className="text-3xl font-bold">{vehicle.name}</h2>
            <p className="text-lg">{vehicle.description}</p>
            <p className="text-lg">{vehicle.description2}</p>
            <p className="text-2xl font-bold">Cena po danu: {vehicle.price} €</p>

            {user && user.role === "customer" && (
              <button
                className="mt-4 px-6 py-2 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors"
                onClick={handleReserveClick}
              >
                Iznajmi
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Seemore;
