/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#1A202C',
        'gold-primary': '#D4AF37',
        'gold-light': '#F0E68C',
        'teal': '#40AEC0',
      },
    },
  },
  plugins: [],
}