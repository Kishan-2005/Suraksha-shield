/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          black: '#020617',
          blue: '#1e3a8a',
          cyan: '#06b6d4',
          red: '#dc2626',
          green: '#10b981'
        }
      }
    },
  },
  plugins: [],
}
