/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  plugins: [require("daisyui")],
  daisyui: {
    themes: ["luxury"],
  },
  theme: {
    screens: {
      sm: "640px",
      md: "798px",
      lg: "1024px",
      xl: "1280px",
    },
  },
};
