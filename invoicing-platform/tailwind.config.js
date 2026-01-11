/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f7ff',
          100: '#ebefff',
          500: '#485DAA',
          600: '#3d4f8f',
          700: '#334174',
        },
      },
    },
  },
  plugins: [],
}
