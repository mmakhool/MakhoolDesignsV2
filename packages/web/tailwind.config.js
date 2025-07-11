/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html', 
    './src/**/*.{js,ts,jsx,tsx}',
    '../ui/src/**/*.{js,ts,jsx,tsx}'
  ],
  presets: [
    // Import the UI library's Tailwind config as a preset
    require('../ui/tailwind.config.js')
  ],
}
