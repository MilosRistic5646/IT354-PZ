import React, { useState } from "react";

const RegisterForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    username: "",
    password: "",
    JMBG: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Prosleđivanje podataka roditeljskoj komponenti
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 bg-white shadow-md rounded"
    >
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Registracija
      </h2>

      {/* Polje za ime */}
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700">
          Ime
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>

      {/* Polje za prezime */}
      <div className="mb-4">
        <label htmlFor="surname" className="block text-gray-700">
          Prezime
        </label>
        <input
          type="text"
          id="surname"
          name="surname"
          value={formData.surname}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>

      {/* Polje za korisničko ime */}
      <div className="mb-4">
        <label htmlFor="username" className="block text-gray-700">
          Korisničko ime
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>

      {/* Polje za šifru */}
      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700">
          Šifra
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>

      {/* Polje za JMBG */}
      <div className="mb-4">
        <label htmlFor="JMBG" className="block text-gray-700">
          JMBG
        </label>
        <input
          type="text"
          id="JMBG"
          name="JMBG"
          value={formData.JMBG}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>

      {/* Dugme za registraciju */}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Registruj se
      </button>
    </form>
  );
};

export default RegisterForm;
