import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../slike/logo.jpg";

const Header = ({ user, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <img
          src={logo}
          alt="Renault Logo"
          className="object-contain"
          style={{ height: "64px", width: "auto", alignSelf: "flex-start" }}
        />

        {/* Navigacija */}
        <nav className="flex space-x-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "hover:text-gray-700 text-yellow-500"
                : "text-gray-700 hover:text-yellow-500"
            }
          >
            Početna
          </NavLink>
          <NavLink
            to="/vehicles"
            className={({ isActive }) =>
              isActive
                ? "hover:text-gray-700 text-yellow-500"
                : "text-gray-700 hover:text-yellow-500"
            }
          >
            Vozila
          </NavLink>
          <NavLink
            to="/services"
            className={({ isActive }) =>
              isActive
                ? "hover:text-gray-700 text-yellow-500"
                : "text-gray-700 hover:text-yellow-500"
            }
          >
            Usluge
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "hover:text-gray-700 text-yellow-500"
                : "text-gray-700 hover:text-yellow-500"
            }
          >
            Kontakt
          </NavLink>
        </nav>

        {/* Padajući meni za korisnika */}
        {user && (
          <div className="relative">
            <button
              className="flex items-center space-x-2 text-gray-700 focus:outline-none"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <img
                src="public/slike/profile-icon.png" // Zameniti sa stvarnom slikom korisnika ako postoji
                alt="Korisnik"
                className="w-8 h-8 rounded-full"
              />
              <span className="font-medium">{user.name}</span>
            </button>

            {/* Padajući meni */}
            {menuOpen && (
              <div
                className="absolute top-full right-0 mt-2 w-48 bg-black text-white shadow-lg z-50"
              >
                <ul className="flex flex-col">
                  <li
                    className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                    onClick={() => {
                      setMenuOpen(false);
                      navigate("/profile"); // Navigacija na profil korisnika
                    }}
                  >
                    Prikaz profila
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                    onClick={() => {
                      navigate("/")
                      setMenuOpen(false);
                      onLogout();
                    }}
                  >
                    Odjavi se
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
