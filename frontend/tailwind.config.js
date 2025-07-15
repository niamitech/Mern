// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Crucial for Tailwind to scan your components
    "./public/index.html",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}