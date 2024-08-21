/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}",
    './src/scss/*.scss',],
  theme: {
    extend: {
      colors: {
        grey: '#4E5562',
      },
    },
  },
  plugins: [],
}