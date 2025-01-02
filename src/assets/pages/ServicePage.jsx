import React from "react";
import Section from "@/assets/components/Section";

const ServicesPage = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <Section
        title="Održavanje i servis"
        content="Redovno održavanje vašeg Renault vozila garantuje bezbednost i pouzdanost."
        image="/slike/service.jpg"
      />
    </div>
  );
};

export default ServicesPage;
