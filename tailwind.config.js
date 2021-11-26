const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  mode: 'jit',
  purge: ['./app/**/*.{js,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        blueGray: {
          500: 'var(--color-blueGray-500)',
        },
        accent: 'var(--accent-color)',
      },
      spacing: {
        17: '3.65rem',
        '5vw': '5vw',
        '8vw': '8vw',
        '10vw': '10vw',
        '35vw': '35vw',
      },
      fontSize: {
        xl: '1.375rem', // 22px
        '2xl': '1.5625rem', // 25px
        '3xl': '1.875rem', // 30px
        '4xl': '2.5rem', // 40px
        '5xl': '3.125rem', // 50px
        '6xl': '3.75rem', // 60px
        '7xl': '4.375rem', // 70px
      },
      fontFamily: {
        sans: ['Nunito', ...defaultTheme.fontFamily.sans],
        mono: ['JetBrains Mono', ...defaultTheme.fontFamily.mono],
      },
      height: {
        hero: 'min(60rem, calc(100vh - 10rem))',
        'hero-sm': 'calc(50vh + 10rem)',
      },
    },
  },
  variants: {
    transitionProperty: ['responsive', 'motion-safe', 'motion-reduce'],
  },
  plugins: [],
}
