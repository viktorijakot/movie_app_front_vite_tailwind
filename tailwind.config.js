/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '2rem',
      },
      colors: {
        'yellow-mine': '#f4d35e',
        'black-mine': '#1f271b',
        'green-mine': '#62c0a2'
      }
    },
  },
  plugins: [],
};
