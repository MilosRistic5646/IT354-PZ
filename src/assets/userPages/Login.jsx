import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "@/assets/context/UserContext";

const Login = () => {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/users");
      const users = await response.json();
      const user = users.find(u => u.email === email && u.password === password);

      if (user) {
        setUser(user);
        navigate("/");
      } else {
        alert("Pogrešan email ili lozinka.");
      }
    } catch (error) {
      console.error("Greška pri prijavljivanju:", error);
      alert("Došlo je do greške. Pokušajte ponovo kasnije.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Prijava</h2>

        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-3" required />

        <input type="password" placeholder="Lozinka" value={password} onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-3" required />

        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">
          Prijavi se
        </button>

        {/* Dodajemo pitanje i link ka registraciji */}
        <p className="mt-4 text-center text-gray-600">
          Nemate nalog?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Registrujte se ovde
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
