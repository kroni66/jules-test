/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'media',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      container: {
        center: true,
        padding: '1rem',
      },
      maxWidth: {
        'container': '1280px'
      },
      screens: {
        'container': '1280px',
      },
    },
  },
  plugins: [],
};