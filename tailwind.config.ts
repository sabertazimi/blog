import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './layouts/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      minWidth: {
        'none': 'none',
        'xs': '20rem',
        'sm': '24rem',
        'md': '28rem',
        'lg': '32rem',
        'xl': '36rem',
        '2xl': '42rem',
        '3xl': '48rem',
        '4xl': '56rem',
        '5xl': '64rem',
        '6xl': '72rem',
        '7xl': '80rem',
        'prose': '65ch',
        'screen-sm': '640px',
        'screen-md': '768px',
        'screen-lg': '1024px',
        'screen-xl': '1280px',
        'screen-2xl': '1536px',
        '1/12': '8.333333%',
        '1/6': '16.666667%',
        '2/12': '16.666667%',
        '1/5': '20%',
        '1/4': '25%',
        '3/12': '25%',
        '1/3': '33.333333%',
        '2/6': '33.333333%',
        '4/12': '33.333333%',
        '2/5': '40%',
        '5/12': '41.666667%',
        '1/2': '50%',
        '2/4': '50%',
        '3/6': '50%',
        '6/12': '50%',
        '7/12': '58.333333%',
        '3/5': '60%',
        '2/3': '66.666667%',
        '4/6': '66.666667%',
        '8/12': '66.666667%',
        '3/4': '75%',
        '9/12': '75%',
        '4/5': '80%',
        '5/6': '83.333333%',
        '10/12': '83.333333%',
        '11/12': '91.666667%',
      },
      maxWidth: {
        '1/12': '8.333333%',
        '1/6': '16.666667%',
        '2/12': '16.666667%',
        '1/5': '20%',
        '1/4': '25%',
        '3/12': '25%',
        '1/3': '33.333333%',
        '2/6': '33.333333%',
        '4/12': '33.333333%',
        '2/5': '40%',
        '5/12': '41.666667%',
        '1/2': '50%',
        '2/4': '50%',
        '3/6': '50%',
        '6/12': '50%',
        '7/12': '58.333333%',
        '3/5': '60%',
        '2/3': '66.666667%',
        '4/6': '66.666667%',
        '8/12': '66.666667%',
        '3/4': '75%',
        '9/12': '75%',
        '4/5': '80%',
        '5/6': '83.333333%',
        '10/12': '83.333333%',
        '11/12': '91.666667%',
      },
      borderWidth: {
        5: '5px',
        6: '6px',
        10: '10px',
      },
      lineHeight: {
        '1': '0.25rem',
        '2': '0.5rem',
        '12': '3rem',
        'extra-loose': '2.5',
      },
      zIndex: {
        25: '25',
        75: '75',
        100: '100',
        1000: '1000',
        max: '9999',
      },
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        light: 'var(--light)',
        dark: 'var(--dark)',
      },
      fontFamily: {
        mono: ['Operator Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [
    plugin(({ addComponents, addUtilities, matchUtilities, theme }) => {
      addComponents({
        '.bg-gradient-primary': {
          '@apply bg-gradient-to-r from-indigo-700 to-red-500': {},
        },
      })

      addUtilities({
        '.content-auto': {
          'content-visibility': 'auto',
        },
        '.content-hidden': {
          'content-visibility': 'hidden',
        },
        '.content-visible': {
          'content-visibility': 'visible',
        },
      })

      matchUtilities(
        {
          'contain-size': (value: string) => ({
            'contain-intrinsic-size': value,
          }),
        },
        { values: theme('height') },
      )
    }),
  ],
}

export default config
