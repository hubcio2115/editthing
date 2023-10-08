/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').options} */
module.exports = {
  plugins: [
    require.resolve("prettier-plugin-tailwindcss"),
    require("@trivago/prettier-plugin-sort-imports"),
  ],
  semi: true,
  trailingComma: "all",
  singleQuote: false,
  printWidth: 80,
  tabWidth: 2,

  importOrder: ["^(~/)", "^[./]"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
