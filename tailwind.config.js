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
      screens: {
        'mobile': { min: '375px', max: '767px' },
        'tablet': { min: '768px', max: '1023px' }, // 1130px 미만을 모바일로 간주
        'desktop': '1130px',          // 1130px 이상을 데스크탑으로 간주
      },
    },
  },
  plugins: [],
}

