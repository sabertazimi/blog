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
        none: 'none',
        xs: '20rem',
        sm: '24rem',
        md: '28rem',
        lg: '32rem',
        xl: '36rem',
        '2xl': '42rem',
        '3xl': '48rem',
        '4xl': '56rem',
        '5xl': '64rem',
        '6xl': '72rem',
        '7xl': '80rem',
        prose: '65ch',
        'screen-sm': '640px',
        'screen-md': '768px',
        'screen-lg': '1024px',
        'screen-xl': '1280px',
        'screen-2xl': '1536px',
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
