module.exports = {
  purge: ["./index.html", ".src/**/*.js", ".dist/**/*.js"], // adding the js files in dist folder Seems more effective than the safelist used before
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
