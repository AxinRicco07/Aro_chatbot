/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'chat-bg': "url('./Components/Assest/background.jpg')",
      },
    },
  },
  plugins: [],
}
