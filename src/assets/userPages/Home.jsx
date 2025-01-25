import React from "react";

const Home = ({ carousel, vehicles }) => {
  return (
    <div>
      {/* Carousel sekcija */}
      {carousel}

      {/* Naša Vozila sekcija */}
      <div className="container mx-auto py-12 px-4">
        <h2 className="text-3xl text-neutral-950 font-bold mb-8 text-center">Neka od naših Vozila</h2>
        {vehicles}
      </div>
    </div>
  );
};

export default Home;
