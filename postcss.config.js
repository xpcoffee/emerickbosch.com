module.exports = {
  plugins: {
    tailwindcss: {
      mode: "jit",
      content: [
        "./src/pages/**/*.{js,jsx,ts,tsx}",
        "./src/components/**/*.{js,jsx,ts,tsx}",
      ],
    },
    autoprefixer: {},
  },
}
