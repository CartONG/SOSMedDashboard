module.exports = {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#1a2747",
        secondary: "#f03e1b",
        textSubtitles: "#3c3c3b",
        blockBackground: "#e3e2e9",
        donationText: "#e8e6e3",
        donationHoverBackground: "#333",
        grayClose: "#999999"
      },
      fontFamily: {
        sans: "Raleway, Helvetica, Arial"
      },
      fontSize: {
        "3xs": ["0.5rem", "0.5rem"],
        tiny: ["0.65rem", "0.75rem"]
      },
      transition: {
        "max-height": "max-height"
      },
      zIndex: {
        100: 100
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
