/** @type {import('prettier-plugin-tailwindcss').options & import('@trivago/prettier-plugin-sort-imports').PrettierConfig} */
module.exports = {
  plugins: [
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
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
