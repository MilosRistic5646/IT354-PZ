import React, { useContext } from "react";
import { UserContext } from "@/assets/context/UserContext";
import { useNavigate } from "react-router-dom";
import { User, Shield, IdCard } from "lucide-react";

const SeeProfile = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Niste prijavljeni. Prijavite se kako biste videli svoj profil.
        </h1>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-7 w-full max-w-lg">
        {/* Naslov i slika */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <img
              src="/slike/profile-icon.png"
              alt="Profilna slika"
              className="w-24 h-24 rounded-full"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            {user.name} {user.surname}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 italic">
            Dobrodošli na svoj profil!
          </p>
        </div>

        {/* Informacije */}
        <div className="space-y-4">
          {/* Ime */}
          <div className="flex items-center space-x-3">
            <User className="w-6 h-6 text-yellow-500" />
            <p className="text-gray-700 dark:text-gray-200 text-lg">
              <strong>Ime:</strong> {user.name}
            </p>
          </div>

          {/* Prezime */}
          <div className="flex items-center space-x-3">
            <User className="w-6 h-6 text-yellow-500" />
            <p className="text-gray-700 dark:text-gray-200 text-lg">
              <strong>Prezime:</strong> {user.surname}
            </p>
          </div>

          {/* Korisničko ime */}
          <div className="flex items-center space-x-3">
            <Shield className="w-6 h-6 text-yellow-500" />
            <p className="text-gray-700 dark:text-gray-200 text-lg">
              <strong>Korisničko ime:</strong> {user.username}
            </p>
          </div>

          {/* Lozinka (ne preporučuje se prikaz u realnoj aplikaciji) */}
          <div className="flex items-center space-x-3">
            <Shield className="w-6 h-6 text-yellow-500" />
            <p className="text-gray-700 dark:text-gray-200 text-lg">
              <strong>Lozinka:</strong> {user.password}
            </p>
          </div>

          {/* JMBG */}
          <div className="flex items-center space-x-3">
            <IdCard className="w-6 h-6 text-yellow-500" />
            <p className="text-gray-700 dark:text-gray-200 text-lg">
              <strong>JMBG:</strong> {user.JMBG}
            </p>
          </div>

          {/* Uloga */}
          <div className="flex items-center space-x-3">
            <Shield className="w-6 h-6 text-yellow-500" />
            <p className="text-gray-700 dark:text-gray-200 text-lg">
              <strong>Uloga:</strong> {user.role}
            </p>
          </div>
        </div>

        {/* Dugme za izmenu */}
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/edit-profile")}
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
