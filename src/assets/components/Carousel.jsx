import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Carousel = () => {
  const [images, setImages] = useState([]); // Stanje za slike
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate(); // Hook za navigaciju

  useEffect(() => {
    // Povlačenje slika sa JSON servera
    const fetchImages = async () => {
      try {
        const response = await fetch("http://localhost:3000/carousel");
        const data = await response.json();
        setImages(data.map((item) => item.image)); // Ekstrakcija URL-ova iz JSON objekata
      } catch (error) {
        console.error("Greška prilikom učitavanja slika:", error);
      }
    };
    fetchImages();
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 7000); // Menjanje slike svakih 7 sekundi
      return () => clearInterval(interval);
    }
  }, [images]);

  // Funkcija za prelazak na sledeću sliku
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Funkcija za prelazak na prethodnu sliku
  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative h-[500px] bg-gray-800 text-white overflow-hidden">
      {/* Strelica levo */}
      <button
        onClick={prevImage}
        className="absolute top-1/2 left-5 transform -translate-y-1/2 text-white text-3xl z-10 bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75"
      >
        &lt;
      </button>

      {/* Slika */}
      {images.length > 0 && (
        <div
          style={{
            backgroundImage: `url(${images[currentIndex]})`,
          }}
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center transition-all duration-1000 ease-in-out opacity-100 transform translate-x-0"
        ></div>
      )}

      {/* Strelica desno */}
      <button
        onClick={nextImage}
        className="absolute top-1/2 right-5 transform -translate-y-1/2 text-white text-3xl bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75"
      >
        &gt;
      </button>

      {/* Sadržaj preko pozadinske slike */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h1 className="text-4xl font-bold">Rentujte Renault Vozila</h1>
        <p className="mt-4 text-lg">Udobnost i sigurnost su zagarantovani</p>
      </div>
    </div>
  );
};

export default Carousel;
