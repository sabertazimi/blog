module.exports = {
  mode: 'jit',
  purge: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  important: true,
  theme: {
    extend: {
      colors: {
        primary: '#1890ff',
        secondary: '#40a9ff',
        light: '#f8f9fa',
        dark: '#343a40',
      },
      minWidth: {
        400: '400px',
      },
      zIndex: {
        25: 25,
        75: 75,
        100: 100,
        max: 9999,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
