import React from "react";
import { User, Mail, Shield } from "lucide-react"; // Ikone iz lucide-react

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
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-indigo-500">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <img
              src="https://via.placeholder.com/100" // Zameniti sa URL-om slike korisnika, ako postoji
              alt="Profilna slika"
              className="w-24 h-24 rounded-full border-4 border-indigo-500 shadow-lg"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">{user.name} {user.surname}</h1>
          <p className="text-gray-600 italic">Dobrodošli na svoj profil!</p>
        </div>

        <div className="space-y-4">
          {/* Ime i Prezime */}
          <div className="flex items-center space-x-3">
            <User className="w-6 h-6 text-indigo-500" />
            <p className="text-gray-700 text-lg">
              <strong>Ime:</strong> {user.name}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <User className="w-6 h-6 text-indigo-500" />
            <p className="text-gray-700 text-lg">
              <strong>Prezime:</strong> {user.surname}
            </p>
          </div>

          {/* Email */}
          <div className="flex items-center space-x-3">
            <Mail className="w-6 h-6 text-indigo-500" />
            <p className="text-gray-700 text-lg">
              <strong>Email:</strong> {user.email || "Nije unet"}
            </p>
          </div>

          {/* Uloga */}
          <div className="flex items-center space-x-3">
            <Shield className="w-6 h-6 text-indigo-500" />
            <p className="text-gray-700 text-lg">
              <strong>Uloga:</strong> {user.role || "Korisnik"}
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => console.log("Izmena profila")}
            className="px-6 py-2 bg-indigo-500 text-white font-semibold rounded-lg shadow hover:bg-indigo-600"
          >
            Izmeni profil
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeeProfile;
