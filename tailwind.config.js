module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  important: true,
  theme: {
    extend: {},
    zIndex: {
      0: 0,
      10: 10,
      20: 20,
      25: 25,
      30: 30,
      40: 40,
      50: 50,
      75: 75,
      100: 100,
      max: 9999,
      auto: 'auto',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
