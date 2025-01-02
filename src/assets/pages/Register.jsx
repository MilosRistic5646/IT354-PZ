import React from "react";
import RegisterForm from "../components/RegisterForm";
import Header from "../components/Header";
import Footer from "../components/Footer";

const RegisterPage = () => {
  const handleRegister = async (formData) => {
    const newPerson = {
      ...formData,
      role: "customer",
    };

    try {
      const response = await fetch("http://localhost:3000/person", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPerson),
      });

      if (!response.ok) {
        throw new Error(`Greška: ${response.status}`);
      }

      alert("Uspešno ste se registrovali!");
    } catch (error) {
      console.error("Greška pri registraciji:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="py-8">
        <RegisterForm onSubmit={handleRegister} />
      </main>
    </div>
  );
};

export default RegisterPage;