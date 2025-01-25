import React from "react";
import { User, Shield, IdCard } from "lucide-react";

const SeeProfile = ({ user }) => {
  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <h1 className="text-2xl font-semibold text-gray-800">
          Niste prijavljeni. Prijavite se kako biste videli svoj profil.
        </h1>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-700">
      <div className="bg-white rounded-lg shadow-lg p-7 w-full max-w-lg">
        {/* Naslov i slika */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <img
              src="public/slike/profile-icon.png"
              alt="Profilna slika"
              className="w-24 h-24 rounded-full"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">
            {user.name} {user.surname}
          </h1>
          <p className="text-gray-600 italic">Dobrodošli na svoj profil!</p>
        </div>

        {/* Informacije */}
        <div className="space-y-4">
          {/* Ime */}
          <div className="flex items-center space-x-3">
            <User className="w-6 h-6 text-yellow-500" />
            <p className="text-gray-700 text-lg">
              <strong>Ime:</strong> {user.name}
            </p>
          </div>

          {/* Prezime */}
          <div className="flex items-center space-x-3">
            <User className="w-6 h-6 text-yellow-500" />
            <p className="text-gray-700 text-lg">
              <strong>Prezime:</strong> {user.surname}
            </p>
          </div>

          {/* Korisničko ime */}
          <div className="flex items-center space-x-3">
            <Shield className="w-6 h-6 text-yellow-500" />
            <p className="text-gray-700 text-lg">
              <strong>Korisničko ime:</strong> {user.username}
            </p>
          </div>

          {/* JMBG */}
          <div className="flex items-center space-x-3">
            <IdCard className="w-6 h-6 text-yellow-500" />
            <p className="text-gray-700 text-lg">
              <strong>JMBG:</strong> {user.JMBG}
            </p>
          </div>

          {/* Uloga */}
          <div className="flex items-center space-x-3">
            <Shield className="w-6 h-6 text-yellow-500" />
            <p className="text-gray-700 text-lg">
              <strong>Uloga:</strong> {user.role}
            </p>
          </div>
        </div>

        {/* Dugme za izmenu */}
        <div className="mt-6 text-center">
          <button
            onClick={() => console.log("Izmena profila")}
            className="px-6 py-2 bg-yellow-500 text-white font-semibold rounded-lg shadow hover:bg-yellow-600"
          >
            Izmeni profil
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeeProfile;
