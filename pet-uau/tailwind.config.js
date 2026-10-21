/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        uau: {
          yellow: '#F9D957',
          blue: '#64BDD1',
          black: '#080808',
          cream: '#FFFDF5',
        }
      },
      fontFamily: {
        display: ['"Fredoka"', '"Outfit"', '"Plus Jakarta Sans"', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', '"Outfit"', 'sans-serif'],
      },
      boxShadow: {
        'brutal-sm': '2px 2px 0px 0px #080808',
        'brutal': '4px 4px 0px 0px #080808',
        'brutal-md': '6px 6px 0px 0px #080808',
        'brutal-lg': '8px 8px 0px 0px #080808',
        'brutal-yellow': '5px 5px 0px 0px #F9D957',
        'brutal-blue': '5px 5px 0px 0px #64BDD1',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-8px) rotate(4deg)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(8px) rotate(-4deg)' },
        }
      },
      animation: {
        marquee: 'marquee 24s linear infinite',
        'float-slow': 'floatSlow 4s ease-in-out infinite',
        'float-reverse': 'floatReverse 4.5s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
