import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "@/assets/context/UserContext";

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/person?username=${username}&password=${password}`
      );
      if (!response.ok) throw new Error("Server nije dostupan!");

      const data = await response.json();

      if (data.length > 0) {
        const user = data[0];
        login(user);
        navigate("/");
      } else {
        setError("Neispravno korisničko ime ili lozinka.");
      }
    } catch (error) {
      console.error("Greška:", error);
      setError("Došlo je do greške. Pokušajte ponovo kasnije.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          Prijava
        </h2>

        {error && <div className="mb-4 text-red-500 text-center">{error}</div>}

        <input
          type="text"
          placeholder="Korisničko ime"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring focus:ring-blue-300 mb-4"
        />

        <input
          type="password"
          placeholder="Lozinka"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring focus:ring-blue-300 mb-6"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Prijavi se
        </button>

        <div className="mt-4 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            Nemate nalog?
            <button
              onClick={() => navigate("/register")}
              className="text-blue-500 hover:underline ml-1"
            >
              Registrujte se
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
