/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
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
        '2-one-two': '1fr 2fr',
        '2-one-one': '1fr 1fr',
      },
    },
  },
  plugins: [],
}

/*
 * Supported breakpoints:
 * < md
 * > md
 * */
