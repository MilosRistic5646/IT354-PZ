import { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "@/assets/context/UserContext";
import logo from "../slike/logo.jpg";

const Header = () => {
  const { user, logout } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <img
          src={logo}
          alt="Renault Logo"
          className="object-contain"
          style={{ height: "64px", width: "auto" }}
        />

        <nav className="flex space-x-8">
          <NavLink to="/" className={({ isActive }) => isActive ? "text-yellow-500" : "text-gray-700 hover:text-yellow-500"}>
            Početna
          </NavLink>
          <NavLink to="/vehicles" className={({ isActive }) => isActive ? "text-yellow-500" : "text-gray-700 hover:text-yellow-500"}>
            Vozila
          </NavLink>
          <NavLink to="/services" className={({ isActive }) => isActive ? "text-yellow-500" : "text-gray-700 hover:text-yellow-500"}>
            Usluge
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? "text-yellow-500" : "text-gray-700 hover:text-yellow-500"}>
            Kontakt
          </NavLink>
          {user?.role === "admin" && (
            <NavLink to="/reserved-ads" className={({ isActive }) => isActive ? "text-yellow-500" : "text-gray-700 hover:text-yellow-500"}>
              Rezervisani Oglasi
            </NavLink>
          )}
        </nav>

        {user ? (
          <div className="relative">
            <button className="text-gray-700 focus:outline-none z-10" onClick={() => setMenuOpen(!menuOpen)}>
              {user.name}
            </button>
            {menuOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 z-50 bg-black text-white shadow-lg">
                <ul>
                  <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer" onClick={() => navigate("/profile")}>
                    Profil
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer" onClick={logout}>
                    Odjavi se
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <NavLink to="/login" className="text-gray-700 hover:text-yellow-500">
            Prijavi se
          </NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;
