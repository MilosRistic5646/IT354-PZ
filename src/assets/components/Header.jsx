import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../slike/logo.jpg";

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <img
          src={logo}
          alt="Renault Logo"
          className="object-contain"
          style={{ height: "64px", width: "auto", alignSelf: "flex-start" }}
        />
        <nav className="flex space-x-8">
        
            <NavLink to="/" className={({ isActive }) => isActive 
            ? "hover:text-gray-700 text-yellow-500"
            : "text-gray-700 hover:text-yellow-500" } >
              Početna
            </NavLink>
            <NavLink to="/vehicles" className={({ isActive }) => isActive 
            ? "hover:text-gray-700 text-yellow-500"
            : "text-gray-700 hover:text-yellow-500" } >
              Vozila
            </NavLink>
            <NavLink to="/services" className={({ isActive }) => isActive 
            ? "hover:text-gray-700 text-yellow-500"
            : "text-gray-700 hover:text-yellow-500" } >
              Usluge
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive 
            ? "hover:text-gray-700 text-yellow-500"
            : "text-gray-700 hover:text-yellow-500" } >
              Kontakt
            </NavLink>
        
        </nav>
      </div>
    </header>
  );
};

export default Header;
