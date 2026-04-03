/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'pixel': ['"Press Start 2P"', 'monospace'],
        'mono': ['"VT323"', 'monospace'],
      },
      colors: {
        'os-bg': '#008080',
        'os-dark': '#000080',
        'os-gray': '#c0c0c0',
        'os-darkgray': '#808080',
        'os-white': '#ffffff',
        'os-black': '#000000',
        'os-yellow': '#ffff00',
        'os-cyan': '#00ffff',
        'os-magenta': '#ff00ff',
        'os-red': '#ff0000',
        'os-green': '#00ff00',
        'os-blue': '#0000ff',
        'os-navy': '#000080',
      },
      boxShadow: {
        'pixel-out': '2px 2px 0px #808080, -2px -2px 0px #ffffff, 2px -2px 0px #808080, -2px 2px 0px #ffffff',
        'pixel-in': '2px 2px 0px #ffffff, -2px -2px 0px #808080, 2px -2px 0px #ffffff, -2px 2px 0px #808080',
        'pixel-btn': 'inset -2px -2px 0px #808080, inset 2px 2px 0px #ffffff',
        'pixel-btn-pressed': 'inset 2px 2px 0px #808080, inset -2px -2px 0px #ffffff',
        'window': '4px 4px 0px #000000',
      },
    },
  },
  plugins: [],
}
