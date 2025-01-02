import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto mr-3 flex justify-between items-center">
        <p className="text-sm">&copy; 2024 Renault Srbija.</p>
        <nav className="flex space-x-5 mr-3">
          <a href="/privacy" className="hover:text-yellow-500">Privatnost</a>
          <a href="/terms" className="hover:text-yellow-500">Uslovi korišćenja</a>
          <a href="/contact" className="hover:text-yellow-500 ">Kontakt</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
