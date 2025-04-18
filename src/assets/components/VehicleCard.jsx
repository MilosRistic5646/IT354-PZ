import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "@/assets/context/UserContext";

const VehicleCard = ({ id, name, description, price, image, onDelete }) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const handleReserveClick = async () => {
    if (!user || user.role !== "customer") {
      alert("Samo prijavljeni korisnici sa rolom 'customer' mogu rezervisati.");
      return;
    }
    try {
      const classifiedAdResponse = await fetch("http://localhost:3000/classifiedAd");
      const classifiedAds = await classifiedAdResponse.json();
      const maxId = classifiedAds.length > 0 ? Math.max(...classifiedAds.map(ad => parseInt(ad.id))) : 0;
      const reservation = { id: (maxId + 1).toString(), idCar: id, idPerson: user.id };
      const postResponse = await fetch("http://localhost:3000/classifiedAd", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reservation)
      });
      if (postResponse.ok) alert("Rezervacija uspešna!");
      else alert("Došlo je do greške pri rezervaciji.");
    } catch (error) {
      console.error("Greška:", error);
      alert("Došlo je do greške. Pokušajte kasnije.");
    }
  };

  const handleDelete = async () => {
    try {
      // Prvo dohvatamo oglas povezan sa automobilom
      const adResponse = await fetch(`http://localhost:3000/ad?carId=${id}`);
      const ads = await adResponse.json();
      
      if (ads.length > 0) {
        const adId = ads[0].id;
        // Brišemo oglas
        await fetch(`http://localhost:3000/ad/${adId}`, { method: "DELETE" });
      }

      // Brišemo automobil
      await fetch(`http://localhost:3000/car/${id}`, { method: "DELETE" });

      // Brišemo samo classifiedAd zapise koji odgovaraju idCar
      const classifiedAdsResponse = await fetch(`http://localhost:3000/classifiedAd?carId=${id}`);
      const classifiedAds = await classifiedAdsResponse.json();
      for (const classifiedAd of classifiedAds) {
        if (classifiedAd.idCar === id) {
          await fetch(`http://localhost:3000/classifiedAd/${classifiedAd.id}`, { method: "DELETE" });
        }
      }

      alert("Oglas, automobil i povezani classifiedAd zapisi su obrisani.");
      onDelete(id);
    } catch (error) {
      console.error("Greška pri brisanju oglasa i povezanih podataka:", error);
      alert("Došlo je do greške pri brisanju. Pokušajte kasnije.");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <img
        src={image || "/slike/default.jpg"}
        alt={name}
        className="w-full h-48 object-cover rounded-t-lg"
        onError={(e) => (e.target.src = "/slike/default.jpg")}
      />
      <div className="mt-4">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{name}</h3>
        <p className="text-gray-600 dark:text-gray-300 mt-2">{description}</p>
        <p className="text-lg font-bold text-gray-800 dark:text-white mt-4">Cena po danu: {price} €</p>
        <div className="mt-6 flex flex-wrap gap-3">
          {user && user.role === "customer" && (
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
              onClick={handleReserveClick}
            >
              Iznajmi
            </button>
          )}
          <button
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors duration-300"
            onClick={() => navigate(`/vehicles/${id}`)}
          >
            Saznaj više
          </button>
          {user && user.role === "owner" && (
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
              onClick={handleDelete}
            >
              Ukloni oglas
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
