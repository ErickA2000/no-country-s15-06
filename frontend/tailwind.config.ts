import type { Config } from "tailwindcss";
const {nextui} = require("@nextui-org/react");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      height: {
        '498px': '498px',
      },
      screens:{
        'mobile': '376px',
        'desktop':'1441px',
      },
      maxWidth:{
        '343px':'343px',
        '392px' :'392px',
        '360px':'360px',
        '450px': '450px',
        '498px':'498px',
        '1440px':'1440px',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'raleway': ['Raleway', 'sans-serif'],
        'poppins': ['var(--font-poppins)'], // Asegúrate de ajustar esta línea si 'var(--font-poppins)' no es compatible.
        'monserrat': ['Montserrat', 'sans-serif'],
      },
      colors: {
        'dark-gray': '#ADB3B3',
        'custom-gray': '#E4E4E4',
        'light-gray': ' #423E3E',
        'lightest-gray': '#838181',
        'slight-gray':'#848199',
        'custom-blue': ' #2A4AF4',
        "perfect-blue": '#1F7F95',
        "primary-400-D": '#175F70',
        "custom-black": '#171717',
        'santa-ana-blue': '#175F70',
        'gray-medium': '#828282',
        "footer-blue": '#103F4B',
        "dashed-gray": '#454647',
        "solid-gray": '#E8EBF1',
        "bone-card": '#F3F1F1',
        primary:{
          300: '#1F7F95',
          400:'#175F70'
        },
        secondary:{
          50: '#ffcc99',
          100: '#ffb266',
          300: '#FF7F00',
          400: '#CC6600',
        }
      },
      boxShadow: {
        'custom': '0px 2px 30px 0px #00000014, 0px 0px 15px 0px #00000008, 0px 4px 4px 0px #00000040',
        'elegant-blue': "#333B69",
        'base-color': '#232323',
        'mini-card': '0px 4px 4px 0px #161B2233'
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        'custom-gradient': 'linear-gradient(180deg, #FFFFFF 0%, #F9FDFE 18.62%, #F3FBFC 24.12%, #E6F6FA 35.12%, #DAF2F7 45.12%, #CDEDF5 57.12%, #C7EBF4 71.62%, #C1E9F2 85.12%)',
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        'button-gradient':'radial-gradient(45.83% 2578.82% at 63.67% 49.43%, #FFE7A8 0%, #F6C84B 100%)',
      },
    },
  },
  darkMode: "class",
  plugins: [nextui(),require('tailwindcss-animate'),],
};

export default config;
