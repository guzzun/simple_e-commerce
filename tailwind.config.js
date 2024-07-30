/** @type {import('tailwindcss').Config} */
module.exports = {
  globals: {
    process: true,
    require: true,
  },
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  extends: [
    'eslint:recommended',
  ],
}

