import React from "react";

const VehicleCard = ({ name, description, price, image }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <img
        src={image || "/slike/default.jpg"}
        alt={name}
        className="w-full h-48 object-cover rounded-t-lg"
        onError={(e) => {
          console.log(`Greška pri učitavanju slike: ${image}`);
          e.target.src = "/slike/default.jpg";
        }}
      />
      <div className="mt-4">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{name}</h3>
        <p className="text-gray-600 dark:text-gray-300 mt-2">{description}</p>
        <p className="text-lg font-bold text-gray-800 dark:text-white mt-4">
          Cena po danu: {price} €
        </p>
      </div>
    </div>
  );
};

export default VehicleCard;
