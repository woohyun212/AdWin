/** @type {import('tailwindcss').Config} */
module.exports = {
  // purge: ['./src/**/*.{js,jsx}', './public/index.html'],
  content: ["./src/**/*.{html,js,jsx}", './public/index.html'],
  theme: {
    extend: {
      colors: {
        pointColor : "#347AEB"
      },
      fontFamily:{
        'SenRegular':['Sen Regular'],
        'SenBold': ['Sen Bold'],
        'SenExtraBold': ['Sen ExtraBold'],
      },
      backgroundImage: {
        'hero-pattern': "url('/images/메인배경화면.jpg')",
        // 'footer-texture': "url('/img/footer-texture.png')",
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        wiggle: 'wiggle 1s ease-in-out infinite'
      }
      },
      ringWidth: ['hover', 'active'],
    },
    plugins: [
  ]
}
