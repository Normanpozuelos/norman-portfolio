/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // This is crucial!
  ],
  theme: {
    extend: {
      keyframes: {
        kitt: {
          '0%': { left: '0%' },
          '50%': { left: '90%' },
          '100%': { left: '0%' },
        },
        
      },
      animation: {
        kitt: 'kitt 1.5s infinite ease-in-out',
      },
    },
  },
  plugins: [],
}
