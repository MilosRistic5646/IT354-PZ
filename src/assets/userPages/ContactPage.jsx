import React from "react";

const ContactPage = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const message = e.target.message.value;

    const newMessage = {
      name,
      email,
      message,
      date: new Date().toISOString(),
    };

    try {
      const response = await fetch("http://localhost:3000/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMessage),
      });

      if (response.ok) {
        alert("Poruka je uspešno poslata!");
        e.target.reset();
      } else {
        alert("Greška pri slanju poruke.");
      }
    } catch (error) {
      console.error("Greška pri slanju:", error);
      alert("Greška pri konekciji sa serverom.");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white min-h-screen flex flex-col">
      <div className="container mx-auto py-12 px-4 flex-grow">
        <h2 className="text-3xl font-bold mb-8 text-center">Kontaktirajte nas</h2>
        <p className="text-center mb-6">Možete nas kontaktirati putem email-a.</p>
        <form
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md"
        >
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Ime</label>
            <input
              name="name"
              required
              className="w-full px-3 py-2 border rounded bg-white dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Email</label>
            <input
              name="email"
              type="email"
              required
              className="w-full px-3 py-2 border rounded bg-white dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Poruka</label>
            <textarea
              name="message"
              required
              rows="4"
              className="w-full px-3 py-2 border rounded bg-white dark:bg-gray-700 dark:text-white"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            Pošalji
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
