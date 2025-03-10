import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate za navigaciju

const VehicleCard = ({ id, name, description, price, image }) => {
  const navigate = useNavigate(); // Inicijalizacija navigacije

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <img
        src={image ? image : "/slike/default.jpg"} // Ako nema slike, koristi default
        alt={name}
        className="w-full h-48 object-cover rounded-t-lg"
        onError={(e) => {
          console.log(`Greška pri učitavanju slike: ${image}`);
          e.target.src = "/slike/default.jpg"; // Ako slika nije dostupna, koristi default
        }}
      />
      <div className="mt-4">
        <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
        <p className="text-lg font-bold text-gray-800 mt-4">Cena: {price} €</p> {/* Prikazivanje cene */}
        <div className="mt-6 flex">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
            Rezerviši
          </button>
          <button
            className="px-4 ml-5 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors duration-300"
            onClick={() => navigate(`/vehicles/${id}`)} // Navigacija na stranicu sa detaljima
          >
            Saznaj više
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
