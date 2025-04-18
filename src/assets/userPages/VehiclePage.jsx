import React from "react";

const VehiclesPage = ({ vehicles }) => {
  return (
    <div className="container mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
        Naša Vozila
      </h2>
      {vehicles}
    </div>
  );
};

export default VehiclesPage;
