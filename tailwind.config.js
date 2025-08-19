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
        accent: 'hsl(170 100% 45%)', // Increased saturation for better visibility
        primary: 'hsl(220 100% 60%)', // Slightly brighter for better contrast
        surface: 'hsl(220 13% 18%)',
        'surface-hover': 'hsl(220 13% 22%)', // New hover state for surface elements
        'text-primary': 'hsl(0 0% 98%)', // Increased brightness for better readability
        'text-secondary': 'hsl(0 0% 80%)', // Increased brightness for better readability
        'border-light': 'hsl(220 13% 25%)', // Lighter border color for better definition
        'border-dark': 'hsl(220 13% 15%)', // Darker border color for subtle separators
        'danger': 'hsl(0 90% 60%)', // Consistent danger color
        'danger-muted': 'hsl(0 90% 30%)', // Muted danger for backgrounds
        'warning': 'hsl(40 90% 60%)', // Consistent warning color
        'warning-muted': 'hsl(40 90% 30%)', // Muted warning for backgrounds
        'success': 'hsl(140 90% 40%)', // Success color
        'success-muted': 'hsl(140 90% 20%)', // Muted success for backgrounds
      },
      borderRadius: {
        'lg': '16px',
        'md': '8px',
        'sm': '4px',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
      },
      boxShadow: {
        'card': '0 4px 16px hsla(0,0%,0%,0.2)',
        'hover': '0 8px 24px hsla(0,0%,0%,0.3)',
        'focus': '0 0 0 3px hsla(220, 100%, 60%, 0.4)',
      },
      animation: {
        'ease-in-out': 'ease-in-out',
      },
      transitionDuration: {
        'fast': '100ms',
        'base': '200ms',
        'slow': '300ms',
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.2' }],
      },
      fontWeight: {
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
      },
      letterSpacing: {
        'tighter': '-0.05em',
        'tight': '-0.025em',
        'normal': '0',
        'wide': '0.025em',
        'wider': '0.05em',
      },
    },
  },
  plugins: [],
}
