/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        carboncounter: {
          "primary": "#166534",    // green-800 - main sidebar color
          "primary-content": "#fafaf9", // stone-50 - text on primary
          "secondary": "#064e3b",  // emerald-900 - from gradient
          "accent": "#14532d",     // green-900 - hover states
          "neutral": "#365314",    // green-950 - darker accents
          "base-100": "#fff7ed",   // orange-50 - main content background
          "base-200": "#166534",   // green-800 - alternative background
          "base-content": "#052e16", // green-950 - main text color
          
          // Additional semantic colors
          "info": "#0891b2",      // cyan-600
          "success": "#15803d",    // green-700
          "warning": "#d97706",    // amber-600
          "error": "#dc2626",      // red-600
        },
      },
    ],
  },
};
