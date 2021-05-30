module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        main: '#1a2747',
        secondary: '#f03e1b',
        textSubtitles: '#3c3c3b',
        blockBackground: '#e3e2e9'
      },
      fontFamily: {
        sans: 'Raleway, Helvetica, Arial'
      },
      fontSize: {
        tiny: ['0.65rem', '0.75rem']
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
