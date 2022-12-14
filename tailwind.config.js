/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'nunito': ["Nunito", "sans-serif"],
      },
      colors: {
        'primary': '#5F34F5',
        'heading': '#11175D',
        'red': '#ff0f0f',
        'bl_opacity': 'rgba(0,0,0,.6)',
        'wh_opacity': 'rgba(255,255,255,.4)',
      },
      maxWidth: {
        'container': '1144px',
      },
      dropShadow: {
        'signup': '0 0px 0px rgba(0, 0, 0, 0.5)',
        'white': '0 0px 0px rgba(255, 255, 255, 0.5)'
      },
    },
  },
  plugins: [],
}
