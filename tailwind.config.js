/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: 'hsl(220 13% 13%)',
        accent: 'hsl(170 100% 40%)',
        primary: 'hsl(220 100% 55%)',
        surface: 'hsl(220 13% 18%)',
        'text-primary': 'hsl(0 0% 95%)',
        'text-secondary': 'hsl(0 0% 75%)',
      },
      borderRadius: {
        'lg': '16px',
        'md': '8px',
        'sm': '4px',
      },
      spacing: {
        'lg': '24px',
        'md': '16px',
        'sm': '8px',
      },
      boxShadow: {
        'card': '0 4px 16px hsla(0,0%,0%,0.2)',
      },
      animation: {
        'ease-in-out': 'ease-in-out',
      },
      transitionDuration: {
        'fast': '100ms',
        'base': '200ms',
      }
    },
  },
  plugins: [],
}