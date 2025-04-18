module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // Ova opcija omogućava korišćenje dark klase
  theme: {
    extend: {
      colors: {
        // Dodaj svoje boje za dark mode ako je potrebno
        background: {
          light: '#ffffff',
          dark: '#1a1a1a',
        },
        text: {
          light: '#333333',
          dark: '#ffffff',
        },
      },
    },
  },
  plugins: [],
}
