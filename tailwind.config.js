/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  safelist: [
    "container",
    "mx-auto",
    {
      pattern: /p-(\d+)/, // يسمح بكل p-1, p-2, p-20 ...
    },
    {
      pattern: /px-(\d+)/, // يسمح بكل px-4, px-10 ...
    },
    {
      pattern: /py-(\d+)/,
    },
    {
      pattern: /m-(\d+)/, // دعم المارجن
    },
    {
      pattern: /mx-(\d+)/,
    },
    { pattern: /my-(\d+)/ },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
