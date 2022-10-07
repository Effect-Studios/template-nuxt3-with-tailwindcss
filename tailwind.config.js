const { screens } = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  content: [
    './components/**/*.{js,vue,ts}',
    './nuxt.config.{js,ts}',
    './pages/**/*.{js,vue,ts}',
    './layouts/**/*.{js,vue,ts}',
    './app.vue',
  ],
  theme: {
    colors: {},
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.25rem',
        lg: '2rem',
        xl: '3rem',
        '2xl': '4rem',
      },
    },
    screens: {
      'mini': '400px',
      ...screens,
    },
    extend: {
      fontFamily: {
        'sans': [],
        'sans-serif': []
      },
    },
  },
  plugins: [],
}
