module.exports = {
  purge: {
    content: ["./index.html", ".src/**/*.js"],
    safelist: [  // added this safelist as the classes on js are not working on production(possibly being purged out during production builds). see https://tailwindcss.com/docs/optimizing-for-production#safelisting-specific-classes
      "p-2",
      "bg-indigo-500",
      "text-white",
      "rounded-md",
      "cursor-pointer",
      "text-center"
    ] 
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
