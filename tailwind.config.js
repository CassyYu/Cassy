const { allowedStatusCodes } = require('next/dist/lib/load-custom-routes')
const plugin = require('tailwindcss/plugin')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      const buttons = {
        '.able-btn': {
          cursor: 'pointer',
          '&:hover': {
            color: theme('colors.gray.800'),
            textDecoration: 'underline'
          }
        },
        '.unable-btn': {
          color: theme('colors.gray.400'),
          cursor: 'not-allowed',
        },
      }

      addComponents(buttons)
    })
  ],
}
