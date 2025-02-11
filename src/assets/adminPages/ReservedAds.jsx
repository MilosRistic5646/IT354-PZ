import { useEffect, useState } from "react";

const ReservedAds = () => {
  const [reservedAds, setReservedAds] = useState([]);

  useEffect(() => {
    const fetchReservedAds = async () => {
      try {
        const [adsResponse, usersResponse, carsResponse, adsDetailsResponse] = await Promise.all([
          fetch("http://localhost:3000/classifiedAd"),
          fetch("http://localhost:3000/person"),
          fetch("http://localhost:3000/car"),
          fetch("http://localhost:3000/ad")
        ]);
  
        const adsData = await adsResponse.json();
        const usersData = await usersResponse.json();
        const carsData = await carsResponse.json();
        const adsDetails = await adsDetailsResponse.json();
  
        const enrichedAds = adsData.map(ad => {
          const user = usersData.find(u => u.id === ad.idPerson);
          const car = carsData.find(c => c.id === ad.idCar);
          const adDetails = adsDetails.find(a => a.carId.toString() === ad.idCar);
  
          return {
            id: ad.id,
            userName: user ? `${user.name} ${user.surname}` : "Nepoznat korisnik",
            carName: car ? car.name : "Nepoznat automobil",
            price: adDetails ? `${adDetails.price} €` : "N/A"
          };
        });
  
        setReservedAds(enrichedAds);
      } catch (error) {
        console.error("Greška prilikom učitavanja rezervisanih oglasa:", error);
      }
    };
  
    fetchReservedAds();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Glavni sadržaj */}
      <main className="container mx-auto py-8 flex-grow pb-20">
        <h1 className="text-2xl font-bold mb-6 text-black text-center">Rezervisani Oglasi</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gray-500">
              <tr>
                <th className="py-4 px-6">Ime Korisnika</th>
                <th className="py-4 px-6">Naziv Automobila</th>
                <th className="py-4 px-6">Cena</th>
              </tr>
            </thead>
            <tbody>
              {reservedAds.length > 0 ? (
                reservedAds.map((ad) => (
                  <tr key={ad.id} className="border-b">
                    <td className="py-4 px-6 text-gray-600 text-center">{ad.userName}</td>
                    <td className="py-4 px-6 text-gray-600 text-center">{ad.carName}</td>
                    <td className="py-4 px-6 text-gray-600 text-center">{ad.price}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-6">Nema rezervisanih oglasa.</td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3" className="py-4 px-6 bg-gray-100 text-center font-semibold">
                  Kraj liste oglasa
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </main>

      {/* Footer koji uvek ostaje na dnu */}
      <footer className="bg-gray-100 text-center py-4 mt-auto">
        © 2024 Renault Srbija.
      </footer>
    </div>
  );
};

export default ReservedAds;
