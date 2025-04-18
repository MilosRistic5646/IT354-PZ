import { useState, useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "@/assets/context/UserContext";
import logoLight from "../slike/logo.jpg";
import logoDark from "../slike/logo-dark.png";

const Header = () => {
  const { user, logout } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <img
          src={darkMode ? logoDark : logoLight}
          alt="Renault Logo"
          className="object-contain"
          style={{ height: "64px", width: "auto" }}
        />

        {/* Navigacija */}
        <nav className="flex space-x-8 items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-500"
                : "text-gray-700 dark:text-gray-200 hover:text-yellow-500"
            }
          >
            Početna
          </NavLink>
          <NavLink
            to="/vehicles"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-500"
                : "text-gray-700 dark:text-gray-200 hover:text-yellow-500"
            }
          >
            Vozila
          </NavLink>
          <NavLink
            to="/services"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-500"
                : "text-gray-700 dark:text-gray-200 hover:text-yellow-500"
            }
          >
            Usluge
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-500"
                : "text-gray-700 dark:text-gray-200 hover:text-yellow-500"
            }
          >
            Kontakt
          </NavLink>
          {user?.role === "admin" && (
            <NavLink
              to="/reserved-ads"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-500"
                  : "text-gray-700 dark:text-gray-200 hover:text-yellow-500"
              }
            >
              Iznajmljena vozila
            </NavLink>
          )}
        </nav>

        {/* Desna strana: Tema + Prijava/Profil */}
        <div className="flex items-center space-x-4">
          {/* Tema toggle switch */}
          <div className="mr-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="w-14 h-8 flex items-center bg-gray-300 dark:bg-gray-700 rounded-full p-1 relative transition-colors duration-300 focus:outline-none"
            >
              <span className="absolute left-1 text-sm text-gray-700 dark:text-gray-200">
                🌙
              </span>
              <span className="absolute right-1 text-sm text-gray-700 dark:text-yellow-300">
                🌞
              </span>
              <div
                className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
                  darkMode ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Prijava / Profil */}
          {user ? (
            <div className="relative">
              <button
                className="text-gray-700 dark:text-white focus:outline-none z-10"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {user.name}
              </button>
              {menuOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 z-50 bg-black text-white shadow-lg">
                  <ul>
                    <li
                      className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                      onClick={() => navigate("/profile")}
                    >
                      Profil
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                      onClick={logout}
                    >
                      Odjavi se
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <NavLink
              to="/login"
              className="text-gray-700 dark:text-white hover:text-yellow-500"
            >
              Prijavi se
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
