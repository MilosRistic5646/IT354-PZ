import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "@/assets/context/UserContext";

const AddAd = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description || !price || !image) {
      alert("Molimo unesite sve podatke.");
      return;
    }
    try {
      const carsResponse = await fetch("http://localhost:3000/car");
      const cars = await carsResponse.json();
      const maxCarId = cars.length > 0 ? Math.max(...cars.map((car) => parseInt(car.id))) : 0;
      const newCar = { id: (maxCarId + 1).toString(), name, description, image: `/slike/${image.name}` };
      
      await fetch("http://localhost:3000/car", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCar),
      });
      
      const adsResponse = await fetch("http://localhost:3000/ad");
      const ads = await adsResponse.json();
      const maxAdId = ads.length > 0 ? Math.max(...ads.map((ad) => parseInt(ad.id))) : 0;
      const newAd = { id: (maxAdId + 1).toString(), carId: newCar.id, price };
      
      await fetch("http://localhost:3000/ad", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAd),
      });
      
      alert("Oglas uspešno dodat!");
      navigate("/vehicles");
    } catch (error) {
      console.error("Greška:", error);
      alert("Došlo je do greške. Pokušajte kasnije.");
    }
  };

  if (!user || user.role !== "owner") {
    return <div className="text-center text-red-500">Nemate dozvolu za dodavanje oglasa.</div>;
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Dodaj novi oglas</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 text-gray-700">Naziv vozila:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded-lg mb-4" />
        
        <label className="block mb-2 text-gray-700">Opis vozila:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border rounded-lg mb-4"></textarea>
        
        <label className="block mb-2 text-gray-700">Cena (€):</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full p-2 border rounded-lg mb-4" />
        
        <label className="block mb-2 text-gray-700">Slika vozila:</label>
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="w-full p-2 border rounded-lg mb-4" />
        
        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded-lg hover:bg-green-700">
          Dodaj oglas
        </button>
      </form>
    </div>
  );
};

export default AddAd;
