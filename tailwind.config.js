const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  mode: 'jit',
  content: ['./app/**/*.{js,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        blueGray: {
          500: 'var(--color-blueGray-500)',
        },
        southsystem: '#ff5100',
        accent: 'var(--accent-color)',
        accentDarker: 'var(--accent-darker-color)',
        twitter: {
          brand: 'rgba(29, 161, 242, 1)',
          transparent: 'rgba(29, 161, 242, 0.08)',
        },
        github: {
          brand: 'rgba(51, 51, 51, 1)',
          transparent: 'var(--color-github-transparent)',
        },
        twitch: {
          brand: 'rgb(100,65,164)',
          transparent: 'rgba(100,65,164, 0.1)',
        },
        linkedin: {
          brand: 'rgba(40,103,178, 1)',
          transparent: 'rgba(40,103,178, 0.08)',
        },
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
        '4xl': '2.25rem', // 36px
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
      maxWidth: {
        '8xl': '96rem',
      },
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
  ],
}
