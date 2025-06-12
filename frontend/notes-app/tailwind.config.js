/** @type {import('tailwindcss').Config} */
export default {
    content: [
    "./index.html",               
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      //Colors Used In THE Project
      colors:{
        primary: "#2B85FF",
        secondary: "#EF863A",
    },
    },
  },
  plugins: [],
}

