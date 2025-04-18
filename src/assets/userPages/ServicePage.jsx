import React from "react";
import Section from "@/assets/components/Section";

const ServicesPage = () => {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto py-12 px-4 text-gray-900 dark:text-white">
        <Section
          title="Održavanje i servis"
          content="Redovno održavanje vašeg Renault vozila garantuje bezbednost i pouzdanost."
          image="/slike/service.jpg"
        />
      </div>
    </div>
  );
};

export default ServicesPage;
