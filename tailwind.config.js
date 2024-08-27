/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.{js,ts}',
    './plugins/**/*.{js,ts}',
    './app.{js,ts,vue}'
  ],
  theme: {
    extend: {
      screens: {
        phone: '414px'
      },
      animation: {
        moveIcon: 'moveIcon 1.5s ease-in-out infinite',
        spin: 'spin 2s linear infinite'
      },
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        moveIcon: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(15px)' }
        }
      }
    }
  },
  plugins: []
}
