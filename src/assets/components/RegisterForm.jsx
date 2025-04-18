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
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 bg-white dark:bg-gray-800 shadow-md rounded"
    >
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">
        Registracija
      </h2>

      {/* Polje za ime */}
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 dark:text-gray-300">
          Ime
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded"
          required
        />
      </div>

      {/* Polje za prezime */}
      <div className="mb-4">
        <label htmlFor="surname" className="block text-gray-700 dark:text-gray-300">
          Prezime
        </label>
        <input
          type="text"
          id="surname"
          name="surname"
          value={formData.surname}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded"
          required
        />
      </div>

      {/* Polje za korisničko ime */}
      <div className="mb-4">
        <label htmlFor="username" className="block text-gray-700 dark:text-gray-300">
          Korisničko ime
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded"
          required
        />
      </div>

      {/* Polje za šifru */}
      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700 dark:text-gray-300">
          Šifra
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded"
          required
        />
      </div>

      {/* Polje za JMBG */}
      <div className="mb-4">
        <label htmlFor="JMBG" className="block text-gray-700 dark:text-gray-300">
          JMBG
        </label>
        <input
          type="text"
          id="JMBG"
          name="JMBG"
          value={formData.JMBG}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
      >
        Registruj se
      </button>
    </form>
  );
};

export default RegisterForm;
