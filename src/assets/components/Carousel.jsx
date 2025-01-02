import React, { useState, useEffect } from "react";

const Carousel = () => {
  const [images, setImages] = useState([]); // Stanje za slike
  const [currentIndex, setCurrentIndex] = useState(0);

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
      }, 5000); // Menjanje slike svakih 5 sekundi
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
        className="absolute top-1/2 right-5 transform -translate-y-1/2 text-white text-3xl z-10 bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75"
      >
        &gt;
      </button>

      {/* Sadržaj preko pozadinske slike */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h1 className="text-4xl font-bold">Otkrijte Renault Vozila</h1>
        <p className="mt-4 text-lg">Inovacije koje pokreću vašu svakodnevicu</p>
        <button className="mt-6 px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600">
          Uloguj se
        </button>
        <button className="mt-6 ml-4 px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-900">
          Registruj se
        </button>
      </div>
    </div>
  );
};

export default Carousel;