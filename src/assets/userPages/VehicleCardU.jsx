import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate za navigaciju

const VehicleCard = ({ id, name, description, price, image }) => {
  const navigate = useNavigate(); // Inicijalizacija navigacije
  const [errorMessage, setErrorMessage] = useState(""); // State za greške

  const handleReserveClick = async () => {
    const userJMBG = prompt("Unesite svoj JMBG:"); // Traži od korisnika da unese JMBG
    if (userJMBG) {
      try {
        const response = await fetch("http://localhost:3000/person"); // Putanja do JSON servera
        const users = await response.json();
        
        // Proverava da li je JMBG u bazi
        const user = users.find(user => user.JMBG === userJMBG);
        
        if (user) {
          // Ako korisnik postoji, prvo dobijamo trenutne rezervacije
          const classifiedAdResponse = await fetch("http://localhost:3000/classifiedAd");
          const classifiedAds = await classifiedAdResponse.json();

          // Pronađi maksimalni id iz trenutnih rezervacija
          const maxId = classifiedAds.length > 0 ? Math.max(...classifiedAds.map(ad => parseInt(ad.id))) : 0;

          // Kreiraj novu rezervaciju sa id-jem koji je veći za 1
          const reservation = {
            id: (maxId + 1).toString(), // Novi id rezervacije
            idCar: id,
            idPerson: user.id
          };

          const postResponse = await fetch("http://localhost:3000/classifiedAd", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(reservation)
          });

          if (postResponse.ok) {
            alert("Rezervacija uspešna!"); // Poruka o uspehu
          } else {
            setErrorMessage("Došlo je do greške prilikom rezervacije. Pokušajte ponovo."); // Poruka o grešci
          }
        } else {
          setErrorMessage("JMBG nije pronađen. Molimo pokušajte ponovo."); // Poruka o grešci
        }
      } catch (error) {
        console.error("Greška prilikom pristupa bazi:", error);
        setErrorMessage("Došlo je do greške. Pokušajte ponovo kasnije."); // Poruka o grešci
      }
    }
  };

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
        <p className="text-lg font-bold text-gray-800 mt-4">Cena po danu: {price} €</p> {/* Prikazivanje cene */}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>} {/* Prikazivanje greške */}
        <div className="mt-6 flex">
          <button 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
            onClick={handleReserveClick} // Dodavanje onClick handler-a
          >
            Iznajmi
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
