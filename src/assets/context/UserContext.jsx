import { createContext, useState } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const updateUserInDB = async (id, updatedData) => {
    try {
      const response = await fetch(`http://localhost:3000/person/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("PATCH failed. Status:", response.status);
        console.error("Response text:", errorText);
        throw new Error("Greška prilikom ažuriranja korisnika");
      }

      return await response.json();
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  const updateUser = async (newData) => {
    if (!user || !user.id) {
      console.error("Nema korisnika ili ID nije definisan");
      return;
    }

    const updatedUser = { ...user, ...newData };
    const result = await updateUserInDB(user.id, newData);

    if (result) {
      console.log("PATCH uspešan:", result);
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } else {
      console.error("PATCH neuspešan");
    }
  };

  return (
    <UserContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
