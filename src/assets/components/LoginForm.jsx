import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ onLogin }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3000/person");
      if (!response.ok) {
        throw new Error("Server nije dostupan!");
      }
      const data = await response.json();

      const user = data.find(
        (person) =>
          person.name === name &&
          person.surname === surname &&
          person.password === password
      );

      if (user) {
        localStorage.setItem("loggedInUser", JSON.stringify(user)); // Čuvanje ulogovanog korisnika u localStorage
        onLogin(user); // Pozivanje onLogin funkcije
        navigate("/"); // Preusmeravanje na Home stranicu
      } else {
        setError("Podaci nisu ispravni. Pokušajte ponovo.");
      }
    } catch (error) {
      console.error("Greška:", error);
      setError("Došlo je do greške. Pokušajte ponovo kasnije.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login
        </h2>

        {error && <div className="mb-4 text-red-500 text-center">{error}</div>}

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
            Ime
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="surname"
          >
            Prezime
          </label>
          <input
            id="surname"
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="password"
          >
            Šifra
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
