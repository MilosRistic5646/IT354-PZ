import React from "react";
import { Link } from "react-router-dom";
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
          <Link to="/" className="text-gray-700 hover:text-yellow-500">
            Početna
          </Link>
          <Link to="/vehicles" className="text-gray-700 hover:text-yellow-500">
            Vozila
          </Link>
          <Link to="/services" className="text-gray-700 hover:text-yellow-500">
            Usluge
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-yellow-500">
            Kontakt
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
