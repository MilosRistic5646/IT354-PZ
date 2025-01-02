import React from "react";
import VehicleList from "@/assets/components/VehicleList";

const VehiclesPage = ({ vehicles }) => {
  return (
    <div className="container mx-auto py-12 px-4">
      <h2 className="text-3xl text-neutral-950 font-bold mb-8 text-center">Naša Vozila</h2>
      <VehicleList vehicles={vehicles} />
    </div>
  );
};

export default VehiclesPage;
