/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563EB', // Deep Blue
        secondary: '#DBEAFE', // Light Blue
        accent: '#F59E0B', // Orange/Yellow
        background: '#F3F4F6', // Light Grey
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // We'll need to import Inter or use system font
      }
    },
  },
  plugins: [],
}
