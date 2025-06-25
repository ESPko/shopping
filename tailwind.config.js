/*tailwind.config.js*/
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'PyeojinGothic-Bold'", "sans-serif"], // 기본 sans 글꼴 덮어쓰기
      },
    },
  },
  plugins: [],
}
