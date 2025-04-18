// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,scss}", // Include all relevant file types in your src folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // Potential v4 specific options might go here - check v4 docs!
};
