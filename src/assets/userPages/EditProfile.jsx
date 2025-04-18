import { useContext, useState, useEffect } from "react";
import { UserContext } from "@/assets/context/UserContext";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const { user, updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    surname: "",
    username: "",
    password: "",
    JMBG: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) {
      console.log("User u EditProfile:", user); // Log za proveru
      setForm({
        name: user.name || "",
        surname: user.surname || "",
        username: user.username || "",
        password: user.password || "",
        JMBG: user.JMBG || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUser(form);
    setMessage("Profil uspešno ažuriran!");
    setTimeout(() => navigate("/profile"), 1500); // Ispravljeno sa /profil
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded shadow-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          Izmeni profil
        </h2>

        {["name", "surname", "username", "password", "JMBG"].map((field) => (
          <input
            key={field}
            name={field}
            type={field === "password" ? "password" : "text"}
            placeholder={
              field === "JMBG"
                ? "JMBG"
                : field.charAt(0).toUpperCase() + field.slice(1)
            }
            value={form[field]}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring focus:ring-blue-300 mb-4"
          />
        ))}

        <button
          type="submit"
          className="w-full bg-yellow-500 text-white font-semibold py-2 rounded-lg hover:bg-yellow-600 transition"
        >
          Sačuvaj izmene
        </button>

        {message && (
          <p className="text-green-500 text-center mt-4">{message}</p>
        )}
      </form>
    </div>
  );
};

export default EditProfile;
