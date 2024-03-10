const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Raleway"', ...defaultTheme.fontFamily.sans],
        default: ['Raleway'],
      },
      colors: {
        white: '#FFF',
        primary: '#73CDFF',
        success: '#65CC34',
        warning: '#CC8634',
        danger: '#CC3434',
      },
      backgroundColor: {
        primary: '#73CDFF',
        success: '#65CC34',
        warning: '#CC8634',
        danger: '#CC3434',
      },
      gridTemplateColumns: {
        '3-one-two-one': '1fr 2fr 1fr',
        '3-96-60-one': '96px 60% 1fr;',
        '3-one-two-two': '1fr 2fr 2fr',
        '2-one-two': '1fr 2fr',
        '2-one-one': '1fr 1fr',
        '2-80-one': '80px 1fr',
      },
      animation:{
        'shake': 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both',
      },
      keyframes: {
        'shake' : {
          '10%, 90%': {
            transform: 'translate3d(-1px, 0, 0)'
          },
          '20%, 80%' : {
            transform: 'translate3d(2px, 0, 0)'
          },
          '30%, 50%, 70%': {
            transform: 'translate3d(-4px, 0, 0)'
          },
          '40%, 60%': {
            transform: 'translate3d(4px, 0, 0)'
          }
        }
      }
    },
  },
  plugins: [],
}

/*
 * Supported breakpoints:
 * sm
 * md
 *
 *  * */
