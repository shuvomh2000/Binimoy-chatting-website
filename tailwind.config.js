/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: "#5F34F5",
        heading: "#11175D",
        red: "#ff0f0f",
        black: "#222",
        green: "#228B22",
        msg: "rgba(77, 77, 77, 0.75)",
        bl_opacity: "rgba(0,0,0,.3)",
        dark_opacity: "rgba(0,0,0,.5)",
        wh_opacity: "rgba(255,255,255,.4)",
      },
      maxWidth: {
        container: "1144px",
      },
      dropShadow: {
        signup: "0 0px 0px rgba(0, 0, 0, 0.5)",
        white: "0 0px 0px rgba(255, 255, 255, 0.5)",
      },
      boxShadow: {
        search: "0 9px 6px -4px rgba(0, 0, 0, 0.3)",
        box: "0 0 10px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [],
};
