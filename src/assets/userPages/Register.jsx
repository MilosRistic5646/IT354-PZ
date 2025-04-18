import React from "react";
import RegisterForm from "../components/RegisterForm";

const RegisterPage = () => {
  const handleRegister = async (formData) => {
    try {
      const response = await fetch("http://localhost:3000/person");
      if (!response.ok) throw new Error(`Greška: ${response.status}`);

      const existingUsers = await response.json();

      const maxId = existingUsers.reduce((max, user) => {
        const currentId = Number(user.id);
        return currentId > max ? currentId : max;
      }, 0);

      const newPerson = {
        id: maxId + 1,
        ...formData,
        role: "customer",
      };

      const postResponse = await fetch("http://localhost:3000/person", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPerson),
      });

      if (!postResponse.ok) {
        throw new Error(`Greška pri registraciji: ${postResponse.status}`);
      }

      alert("Uspešno ste se registrovali!");
    } catch (error) {
      console.error("Greška pri registraciji:", error);
      alert("Došlo je do greške pri registraciji.");
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <main className="py-8">
        <RegisterForm onSubmit={handleRegister} />
      </main>
    </div>
  );
};

export default RegisterPage;
