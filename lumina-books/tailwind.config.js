/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        apple: {
          bg: "#fbfbfd",
          text: "#1d1d1f",
          gray: "#86868b",
          blue: "#0071e3",
          card: "#ffffff"
        }
      }
    },
  },
  plugins: [],
}