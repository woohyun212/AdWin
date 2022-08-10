/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('/images/pedro-lastra.jpg')",
        'footer-texture': "url('/img/footer-texture.png')",
      }
    },
    // opacity: {
    //   '0': '0',
    //   '20': '0.2',
    //   '40': '0.4',
    //   '60': '0.6',
    //   '80': '0.8',
    //   '100': '1',
    // }
  },
  plugins: [],
}
