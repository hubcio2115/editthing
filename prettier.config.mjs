/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').options} */
const config = {
  plugins: [
    "prettier-plugin-tailwindcss",
    "@trivago/prettier-plugin-sort-imports",
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

export default config;
