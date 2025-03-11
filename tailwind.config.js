/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
  daisyui: {
    themes: [
      {
        carboncounter: {
          "primary": "#166534",      // green-800 - main sidebar color
          "primary-content": "#f1f5f9", // slate-50 - high-contrast text on primary
          "secondary": "#ea580c",    // orange-600 - vibrant dark orange for highlights
          "accent": "#14532d",       // green-900 - hover states
          "neutral": "#1b4332",      // green-950 - for darker accents
          "base-100": "#fefce8",     // yellow-50 - main content background for a warm tone
          "base-200": "#f7f3eb",     // stone-100 - alternative background for subtle separation
          "base-content": "#164e3b", // teal-700 - main text color for contrast and readability

          // Additional semantic colors
          "info": "#0ea5e9",         // sky-500 - vibrant blue for informational alerts
          "success": "#16a34a",      // green-600 - softer green for success states
          "warning": "#f59e0b",      // amber-500 - bright amber for warnings
          "error": "#ef4444",        // red-500 - clearer red for error states

          // // Badge-specific colors
          // "badge-success": "#16a34a",
          // "badge-success-content": "#ffffff",
          // "badge-warning": "#f59e0b",
          // "badge-warning-content": "#ffffff",
          // "badge-error": "#ef4444",
          // "badge-error-content": "#ffffff"
        },
      },
    ],
  },

};
