// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Ensure this path covers all your components and pages
  ],
  theme: {
    extend: {
      colors: {
        'main-yellow': '#ffed74', // Custom color for your logo yellow
      },
    },
  },
  plugins: [],
};