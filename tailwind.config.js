/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        skyblue_light: '#cddfe9',
        skyblue_deep: '#a4bcd3',
        text_carcoal: '#20262a',
      },
    },
  },
  plugins: [],
}
