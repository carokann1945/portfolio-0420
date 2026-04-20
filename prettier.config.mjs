/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  semi: true,
  singleQuote: true,
  singleAttributePerLine: false,
  bracketSameLine: true,
  trailingComma: 'all',
  arrowParens: 'always',
  printWidth: 120,
  endOfLine: 'lf',
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindStylesheet: './src/app/globals.css',
  tailwindFunctions: ['clsx', 'cn', 'cva'],
};

export default config;
