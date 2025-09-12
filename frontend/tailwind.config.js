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
        'deep-navy': '#0A1425',
        'muted-blue-gray': '#1D283D',
        'luminous-gold': '#DBC49A',
        'warm-parchment': '#E8D5B1',
        'soft-cream': '#DED6C4',
      },
      fontFamily: {
        serif: ['Georgia', 'Times New Roman', 'serif'],
      }
    },
  },
  plugins: [],
}