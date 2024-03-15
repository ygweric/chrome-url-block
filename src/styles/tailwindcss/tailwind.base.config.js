/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // 此路径是基于root目录的，不是'tailwind.config.js'的位置
    './src/**/*.{vue,js,ts,jsx,tsx,html}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
